package com.edge.backend.models.advert.equipmentInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Extra {

    private Boolean alloyWheels;
    private Boolean summerTyres;
    private Boolean winterTyres;
    private Boolean allSeasonTyres;
    private String breakdownKit;
    private Boolean tyrePressureMonitoring;
    private Boolean winterPackage;
    private Boolean smokerPackage;
    private Boolean sportsPackage;
    private Boolean sportsSuspension;
    private Boolean airSuspension;
    private String trailerCoupling;
    private Boolean cargoBarrier;
    private Boolean skiBag;
    private Boolean sunroof;
    private Boolean panoramicRoof;
    private Boolean roofRack;
    private Boolean disabledAccessible;
    private Boolean taxi;

}
