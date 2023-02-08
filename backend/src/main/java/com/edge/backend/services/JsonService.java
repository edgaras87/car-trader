package com.edge.backend.services;


import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface JsonService {

    //String importTo(String collection, List<String> jsonLines);
    public String importTo(Class<?> type, List<String> jsonLines) throws JsonProcessingException;

}
