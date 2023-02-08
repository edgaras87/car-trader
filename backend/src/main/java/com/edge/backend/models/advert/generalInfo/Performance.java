package com.edge.backend.models.advert.generalInfo;

import com.edge.backend.exception.validators.AllowedValues;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class Performance {

    @NotNull
    @AllowedValues(values = {"Diesel", "Diesel / Electric", "Petrol", "Petrol / Electric", "Electric", "Hydrogen", "Hydrogen / Electric"})
    private  String fuel;
    private  String consumption_urban;
    private  String consumption_extra_urban;
    private  String consumption_combined;
    private  String co2_emissions;
    private  String emission;
    private  String emissionSticker;
}
