package com.edge.backend.services;

import com.edge.backend.models.specification.Specification;
import com.edge.backend.payload.response.SpecificationModels;
import com.edge.backend.repositories.SpecificationRepository;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecificationServiceImpl implements SpecificationService {

    private final SpecificationRepository specificationRepository;
    private final MongoTemplate mongoTemplate;

    public List<SpecificationModels> specificationModels() {

        GroupOperation groupOperation
                = Aggregation.group("general.brand").addToSet("general.model").as("model");

        // sort documents by 'general.brand' which is as _id
        SortOperation sortOperation = Aggregation.sort(Sort.Direction.ASC, "_id");

        ProjectionOperation projectionOperation
                = Aggregation.project()
                .andExpression("_id").as("brand")
                .andExpression("model").as("model")
                .andExclude("_id");


        // pack all aggregations together to pass on mongodb document
        Aggregation aggregation = Aggregation.newAggregation(groupOperation,sortOperation,projectionOperation);
        return mongoTemplate.aggregate(aggregation, Specification.class, SpecificationModels.class).getMappedResults();
    }

    @Override
    public List<Specification> specifications(String brand, String model, Date produced) {
        return specificationRepository.specifications(brand,model,produced);
    }
}