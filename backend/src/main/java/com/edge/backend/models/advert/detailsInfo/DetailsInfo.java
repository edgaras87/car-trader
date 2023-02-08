package com.edge.backend.models.advert.detailsInfo;


import com.edge.backend.exception.groups.OnPublish;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DetailsInfo {

    private String subtitle;
    private String description;

    @NotNull(groups = OnPublish.class)
    private Integer price;
    private Boolean isNegotiable;
    List<Image> images;

    @NotNull
    private Boolean completed;
}
