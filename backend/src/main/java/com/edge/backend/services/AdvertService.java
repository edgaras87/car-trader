package com.edge.backend.services;

import com.edge.backend.models.advert.Advert;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.InvalidPropertiesFormatException;
import java.util.List;

public interface AdvertService {

    Advert create(Advert advert);
    Advert update(Advert advert);

    Advert unpublish(String advertId, String userId) throws InvalidPropertiesFormatException;

    Advert publish(Advert advert) throws InvalidPropertiesFormatException;

    List<Advert> findAllByUserId(String userId);

    Advert getById(String id);


    Advert delete(String userId, String id);

    Page<Advert> search(String brand, String model, String fuel, Date yearFrom, Date yearTill, Integer priceFrom, Integer priceTill , Long mileageFrom, Long mileageTill, Double longitude, Double latitude, Integer distance, String country, Pageable pageable);

}
