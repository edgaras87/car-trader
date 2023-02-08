package com.edge.backend.models.specification;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class General {
    private String brand;
    private String model;
    private String generation;
    private String powertrainArchitecture;
    private String seats;
    private String doors;
    private String body;
    private String modification;


    private Date producedFrom;
    private Date producedTill;




    public Long getProducedFrom() {
        return (producedFrom != null) ? producedFrom.getTime() : null;
    }

    public Long getProducedTill() {
        return (producedTill != null) ? producedTill.getTime() : null;
    }
}
