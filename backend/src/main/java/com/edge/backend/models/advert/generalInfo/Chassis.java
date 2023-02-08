package com.edge.backend.models.advert.generalInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Chassis  {

    private String gear;
    private String transmission;
    private Boolean paddleshifter;
    private String drivewheels;
}
