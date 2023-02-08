package com.edge.backend.models.specification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Performance {
    private  String fuel;
    private  String consumption_urban;
    private  String consumption_extra_urban;
    private  String consumption_combined;
    private  String co2_emissions;
    private  String emission;
    private  String emissionSticker;
}
