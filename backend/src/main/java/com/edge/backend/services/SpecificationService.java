package com.edge.backend.services;

import com.edge.backend.models.specification.Specification;
import com.edge.backend.payload.response.SpecificationModels;
import org.bson.Document;

import java.util.Date;
import java.util.List;

public interface SpecificationService {

    List<SpecificationModels> specificationModels();
    List<Specification> specifications(String brand, String model, Date produced);
}
