package com.edge.backend.services;

import com.edge.backend.exception.customExeptions.NoSuchElementFoundException;
import com.edge.backend.models.advert.Advert;
import com.edge.backend.repositories.AdvertRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.data.domain.*;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;


import java.time.ZonedDateTime;
import java.util.*;

@Slf4j
@Service
@AllArgsConstructor
public class AdvertServiceImpl implements AdvertService {

    private AdvertRepository advertRepository;
    private MongoTemplate mongoTemplate;


    @Override
    public Advert create(Advert advert) {

        advert.setModifiedAt(ZonedDateTime.now());
        advert.setCreatedAt(ZonedDateTime.now());
        advert.setIsPublished(false);
        return advertRepository.save(advert);
    }


    @Override
    public Advert getById(String id) {
        return advertRepository.findById(id).orElseThrow(()->new NoSuchElementFoundException(String.format("advertisement with id:'%s' not found", id)));
    }

    @Override
    public Advert unpublish(String advertId, String userId) throws InvalidPropertiesFormatException {


        // temporary solution, later update with fetching and validate only fields that is provided
        Advert advert = checkIfAdvertExist(advertId, userId);
        advert.setModifiedAt(ZonedDateTime.now());
        advert.setPublishedAt(null);
        advert.setIsPublished(false);

        return advertRepository.save(advert);
    }

    @Override
    public Advert publish(Advert advert) throws InvalidPropertiesFormatException {


        // temporary solution, later update with fetching and validate only fields that is provided
        Advert old = checkIfAdvertExist(advert.getId(), advert.getUserId());
        advert.setModifiedAt(ZonedDateTime.now());
        advert.setCreatedAt(old.getCreatedAt());
        advert.getContactInfo().getContact().setAccountType(old.getContactInfo().getContact().getAccountType());


        if (advert.getGeneralInfo().getCompleted() &&
            advert.getGeneralInfo().getCompleted() &&
            advert.getEquipmentInfo().getCompleted() &&
            advert.getContactInfo().getCompleted()) {
                advert.setIsPublished(true);
                advert.setPublishedAt(ZonedDateTime.now());
        } else throw new InvalidPropertiesFormatException("An incomplete advertisement has been attempted to be published.");


        advert.setModifiedAt(ZonedDateTime.now());



        return advertRepository.save(advert);
    }

    @Override
    public Advert update(Advert advert)  {

        // temporary solution, later update with fetching and validate only fields that is provided
        Advert old = checkIfAdvertExist(advert.getId(), advert.getUserId());
        advert.setModifiedAt(ZonedDateTime.now());
        advert.setCreatedAt(old.getCreatedAt());
        advert.getContactInfo().getContact().setAccountType(old.getContactInfo().getContact().getAccountType());
        advert.setIsPublished(old.getIsPublished());

        return advertRepository.save(advert);
    }

    private Advert checkIfAdvertExist(String advertId, String userId) {

        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(advertId));
        query.addCriteria(Criteria.where("userId").is(userId));

        Advert foundAdvert = mongoTemplate.findOne(query, Advert.class);

        if (foundAdvert == null)
            throw new NoSuchElementFoundException(String.format("advertisement with id:'%s' not found", advertId));
        else
            return foundAdvert;
    }




    @Override
    public List<Advert> findAllByUserId(String userId) {
        return advertRepository.findAllByUserId(userId);
    }








    @Override
    public Advert delete(String userId, String id) {

        /*
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        query.addCriteria(Criteria.where("userId").is(userId));
        mongoTemplate.remove(query,Advert.class);
        */

        // delete using method that is implemented by name in repository
        return advertRepository.deleteByUserIdAndId(userId, id);
    }

    @Override
    public Page<Advert> search(String brand, String model, String fuel,
                                 Date yearFrom, Date yearTill,
                                 Integer priceFrom, Integer priceTill,
                                 Long mileageFrom, Long mileageTill,
                                 Double longitude, Double latitude,
                                 Integer distance, String country,
                                 Pageable pageable) {






        List<AggregationOperation> mainStages = new ArrayList<>();

        // by distance
        if (longitude != null && latitude != null && distance != null) {


            final NearQuery query = NearQuery.near(new Point(longitude,latitude), Metrics.KILOMETERS)
                    .minDistance(0)
                    .maxDistance(2000)
                    .spherical(true);

            mainStages.add(Aggregation.geoNear(query, "distance"));
            mainStages.add(new MatchOperation(new Criteria("distance").lte(distance)));


        // by country
        } else if (country != null && !country.isEmpty() ) {
            mainStages.add(new MatchOperation(new Criteria("contactInfo.address.country").is(country)));
        }

        // is published
        mainStages.add(new MatchOperation(new Criteria("isPublished").is(true)));


        // brand
        if (brand != null && !brand.isEmpty()) {
            mainStages.add(new MatchOperation(new Criteria().where("generalInfo.general.brand").regex(brand,"i")));
        }

        // model
        if (model != null && !model.isEmpty()) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.general.model").is(model)));
        }

        // fuel
        if (fuel != null && !fuel.isEmpty()) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.performance.fuel").is(fuel)));
        }

        // year gte
        if (yearFrom != null) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.general.produced").gte(yearFrom)));
        }

        // year lte
        if (yearTill != null) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.general.produced").lte(yearTill)));
        }

        // price gte
        if (priceFrom != null ) {
            mainStages.add(new MatchOperation(new Criteria("detailsInfo.price").gte(priceFrom)));
        }

        // price lte
        if (priceTill != null) {
            mainStages.add(new MatchOperation(new Criteria("detailsInfo.price").lte(priceTill)));
        }

        // mileage gte
        if (mileageFrom != null ) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.condition.mileage").gte(mileageFrom)));
        }

        // mileage lte
        if (mileageTill != null) {
            mainStages.add(new MatchOperation(new Criteria("generalInfo.condition.mileage").lte(mileageTill)));
        }

        // id object to string
        mainStages.add(new AddFieldsOperation(
                "userIdAsObject",
                ConvertOperators.ToObjectId.toObjectId("$userId"))
        );

        mainStages.add(new AddFieldsOperation(
                "_id",
                ConvertOperators.ToString.toString("$_id"))        );
        // ===========================================



        mainStages.add(LookupOperation.newLookup()
                .from("users")
                .localField("userIdAsObject")
                .foreignField("_id")
                .as("user"));


        mainStages.add(Aggregation.unwind("user"));



        mainStages.add(new ProjectionOperation()

                .andInclude("_id")
                .andInclude("userId")
                //.andInclude("detailsInfo.price")
                .andInclude("modifiedAt")

                .andInclude("generalInfo")
                .andInclude("equipmentInfo")
                .andInclude("detailsInfo")
                .andInclude("contactInfo")



                .andInclude("distance")
                .andInclude("user.account")

        );

        return pageAggregation(pageable, mainStages, Advert.class, Advert.class);
    }

    private  <T> Page<T> pageAggregation(
            final Pageable pageable,  // result page setup
            final List<AggregationOperation> mainStages, // query operations
            final Class collection, // target class
            final Class clazz) {    // result class

        final List<AggregationOperation> stagesWithCount = new ArrayList<>(mainStages);
        stagesWithCount.add(Aggregation.count().as("count"));
        final Aggregation countAgg = Aggregation.newAggregation(stagesWithCount);
        final Long count = Optional
                .ofNullable(mongoTemplate.aggregate(countAgg, collection, Document.class).getUniqueMappedResult())
                .map(doc -> ((Integer) doc.get("count")).longValue())
                .orElse(0L);

        final List<AggregationOperation> stagesWithPaging = new ArrayList<>(mainStages);
        if(pageable.getSort().isSorted()) stagesWithPaging.add(Aggregation.sort(pageable.getSort()));
        stagesWithPaging.add(Aggregation.skip(pageable.getOffset()));
        stagesWithPaging.add(Aggregation.limit(pageable.getPageSize()));
        final Aggregation resultAgg = Aggregation.newAggregation(stagesWithPaging);
        final List<T> result = mongoTemplate.aggregate(resultAgg, collection, clazz).getMappedResults();



        return new PageImpl<>(result, pageable, count);
    }





}
