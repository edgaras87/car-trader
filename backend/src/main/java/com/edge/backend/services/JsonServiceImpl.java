package com.edge.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoBulkWriteException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class JsonServiceImpl implements JsonService {

    private MongoTemplate mongoTemplate;

    // simple string
    private List<Document> generateMongoDocs(List<String> lines) {
        List<Document> docs = new ArrayList<>();
        for(String json: lines)
            docs.add(Document.parse(json));
        return docs;
    }

    public String importTo(String collection, List<String> jsonLines) {
        List<Document> mongoDocs = generateMongoDocs(jsonLines);
        int inserts = insertInto(collection, mongoDocs);
        return inserts+"/"+jsonLines.size();
    }

    // specific java type
    private <T> List<Document> generateMongoDocs(List<String> lines, Class<T> type) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        List<Document> docs = new ArrayList<>();
        for(String json: lines) {
            if (type != null) {
                mapper.readValue(json, type);
            }
            docs.add(Document.parse(json));

        }
        return docs;
    }

    public String importTo(Class<?> type, List<String> jsonLines) throws JsonProcessingException {
        List<Document> mongoDocs = generateMongoDocs(jsonLines, type);

        String collection = type.getAnnotation(org.springframework.data.mongodb.core.mapping.Document.class).value();

        int inserts = insertInto(collection, mongoDocs);
        return inserts+"/"+jsonLines.size();
    }




    // common
    private int insertInto(String collection, List<Document> mongoDocs) {
        try {
            mongoTemplate.dropCollection(collection);
            mongoTemplate.createCollection(collection);
            Collection<Document> inserts = mongoTemplate.insert(mongoDocs, collection);
            return inserts.size();

        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof MongoBulkWriteException) {
                return ((MongoBulkWriteException) e.getCause()).getWriteResult().getInsertedCount();
            }
            return 0;
        }
    }




}
