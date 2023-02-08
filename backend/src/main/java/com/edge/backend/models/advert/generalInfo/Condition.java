package com.edge.backend.models.advert.generalInfo;


import com.edge.backend.exception.groups.OnPublish;
import com.edge.backend.exception.validators.DateBoundary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Condition {

    @NotNull
    private Long mileage;
    private Short owners;
    private Boolean accidentFree;

    @NotNull(groups = OnPublish.class)
    private Boolean roadworthy;
    private Boolean nonSmoking;
    @DateBoundary
    private Date inspectionUntil;
    private Boolean serviceHistory;
    private Boolean warranty;

    public Long getInspectionUntil() {
        return (inspectionUntil != null) ? inspectionUntil.getTime() : null;
    }
}
