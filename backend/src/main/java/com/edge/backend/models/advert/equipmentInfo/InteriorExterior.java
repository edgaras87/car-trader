package com.edge.backend.models.advert.equipmentInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InteriorExterior {
    private String exteriorColor;
    private Boolean metalic;
    private String material;
    private String interiorColor;
}
