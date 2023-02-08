package com.edge.backend.repositories;

import com.edge.backend.models.advert.Advert;
import com.edge.backend.models.advert.detailsInfo.Image;
import com.edge.backend.models.specification.Specification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertRepository extends MongoRepository<Advert,String> {

    //@Query(value = "{ userId: ?0 }")
    public List<Advert> findAllByUserId(String userId);
    Advert deleteByUserIdAndId(String userId, String id);

}
