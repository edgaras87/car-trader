package com.edge.backend.models.advert.equipmentInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comfort {

    private String climatisation;
    private Boolean auxiliaryHeating;
    private Boolean heatedWindshield;
    private Boolean heatedSteeringWheel;
    private Boolean selfSteering;
    private List<String> parkingAssist;
    private List<String> camera;
    private List<String> seatsHeated;
    private List<String> seatsElectricAdjustable;
    private Boolean seatsSport;
    private Boolean armRest;
    private Boolean seatsMassage;
    private Boolean seatsMemory;
    private Boolean seatsVentilation;
    private Boolean seatsFoldflat;
    private Boolean electricWindow;
    private Boolean electricMirror;
    private Boolean electricTailgate;
    private Boolean centralLocking;
    private Boolean keyless;
    private Boolean lightSensor;
    private Boolean rainSensor;
    private Boolean powerAssistSteering;
    private Boolean leatherSteeringWheel;
}
