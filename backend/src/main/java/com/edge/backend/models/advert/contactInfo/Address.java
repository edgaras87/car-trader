package com.edge.backend.models.advert.contactInfo;


import com.edge.backend.exception.groups.OnPublish;
import com.edge.backend.exception.validators.AllowedValues;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @NotBlank(groups = OnPublish.class)
    private String street_number;
    @NotBlank(groups = OnPublish.class)
    private String route;
    @NotBlank(groups = OnPublish.class)
    private String locality;
    @NotNull(groups = OnPublish.class)
    @AllowedValues(values = {"AT","BE","CZ","DK","EE","FI","FR","DE","GR","HU","IT","LV","LI","LT","LU","MD","NL","NO","PL","PT","RO","SK","SI","ES","SE","CH","UA",})
    private String country;
    @NotBlank(groups = OnPublish.class)
    private String postal_code;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

}
