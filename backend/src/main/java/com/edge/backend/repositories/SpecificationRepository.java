package com.edge.backend.repositories;

import com.edge.backend.models.specification.Specification;
import org.bson.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SpecificationRepository extends MongoRepository<Specification, String> {

    //@Query(value = "{ 'general.brand':{$eq: ?0},'general.model':{$eq: ?1},'general.producedFrom' : { $lte : ?2 }, 'general.producedTill' : { $gt : ?2 } }", fields = "{'_id': 0}")
    @Query(value = "{ 'general.brand':{$eq: ?0},'general.model':{$eq: ?1},'general.producedFrom' : { $lte : ?2 }, 'general.producedTill' : { $gt : ?2 } }")
    List<Specification> specifications(String brand, String model, Date produced);


}
