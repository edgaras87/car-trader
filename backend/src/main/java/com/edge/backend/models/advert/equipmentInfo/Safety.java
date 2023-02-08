package com.edge.backend.models.advert.equipmentInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Safety {
    private Boolean abs;
    private Boolean esp;
    private Boolean asr;
    private Boolean hillStart;
    private Boolean fatigueWarning;
    private Boolean laneChange;
    private Boolean blindSpot;
    private Boolean dimmingMirror;
    private Boolean nightVision;
    private Boolean emergencyBrake;
    private Boolean emergencyCall;
    private Boolean trafficSignRecog;
    private String cruise;
    private Boolean speedLimit;
    private Boolean distanceWarning;
    private String airbags;
    private Boolean isofixChild;
    private Boolean isofixPassenger;
    private String headlights;
    private Boolean headlightsWasher;
    private Boolean alarm;
    private Boolean immobilizer;
}
