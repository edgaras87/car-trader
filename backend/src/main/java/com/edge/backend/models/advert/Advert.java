package com.edge.backend.models.advert;

import com.edge.backend.exception.groups.OnCreate;
import com.edge.backend.exception.groups.OnUpdate;
import com.edge.backend.models.advert.contactInfo.ContactInfo;
import com.edge.backend.models.advert.detailsInfo.DetailsInfo;
import com.edge.backend.models.advert.equipmentInfo.EquipmentInfo;
import com.edge.backend.models.advert.generalInfo.GeneralInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Document("adverts")
@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonInclude(value = JsonInclude.Include.NON_EMPTY, content = JsonInclude.Include.NON_NULL)
public class Advert {


    @Id
    @Null(groups = OnCreate.class)
    @NotNull(groups = OnUpdate.class)
    private String id;

    @Null
    @JsonIgnore
    private String userId;

    @Null @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Boolean isPublished;

    @Null @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ZonedDateTime createdAt;

    @Null @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ZonedDateTime modifiedAt;

    @Null @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ZonedDateTime publishedAt;

    @Valid @NotNull
    private GeneralInfo generalInfo;

    @Valid @NotNull
    private EquipmentInfo equipmentInfo;

    @Valid @NotNull
    private DetailsInfo detailsInfo;

    @Valid @NotNull
    private ContactInfo contactInfo;
}
