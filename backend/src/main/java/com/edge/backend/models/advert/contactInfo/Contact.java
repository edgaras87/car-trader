package com.edge.backend.models.advert.contactInfo;


import com.edge.backend.exception.groups.OnCreate;
import com.edge.backend.exception.groups.OnPublish;
import com.edge.backend.exception.validators.AllowedValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contact {

    @AllowedValues(values = {"Mr.","Mrs."}, groups = OnPublish.class)
    private String title;
    @NotBlank(groups = OnPublish.class)
    private String fisrtName;
    @NotBlank(groups = OnPublish.class)
    private String lastName;
    @NotNull(groups = OnPublish.class)
    private Boolean showName;
    @NotBlank(groups = OnPublish.class)
    private String countryCode;
    @NotBlank(groups = OnPublish.class)
    private String phoneNumber;

    //@NotBlank(groups = OnCreate.class)
    //@AllowedValues(value = {"Private", "Dealer"})
    //@Null
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String accountType;
}
