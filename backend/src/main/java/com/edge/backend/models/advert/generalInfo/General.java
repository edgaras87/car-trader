package com.edge.backend.models.advert.generalInfo;

import com.edge.backend.exception.validators.DateBoundary;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Slf4j
public class General {



    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    private String generation;

    private String powertrainArchitecture;

    private String seats;

    private String doors;

    private String body;

    private String modification;

    @NotNull
    @DateBoundary(message = "produced is out of boundary")
    private Date produced;

    @DateBoundary(message = "producedFrom is out of boundary")
    private Date producedFrom;

    @DateBoundary(message = "producedTill is out of boundary")
    private Date producedTill;

    public void setProduced(Long produced) { this.produced = new Date(produced);  }

    public Long getProduced() { return (produced != null) ? produced.getTime() : null; }
    public Long getProducedFrom() {
        return (producedFrom != null) ? producedFrom.getTime() : null;
    }
    public Long getProducedTill() {
        return (producedTill != null) ? producedTill.getTime() : null;
    }

}
