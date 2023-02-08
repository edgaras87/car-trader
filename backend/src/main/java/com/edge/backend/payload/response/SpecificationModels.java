package com.edge.backend.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class SpecificationModels {
    private String brand;
    private List<String> model;
}
