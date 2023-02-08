package com.edge.backend.models.advert.generalInfo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneralInfo {

    @Valid
    @NotNull
    private General general;

    @Valid
    @NotNull
    private Performance performance;

    private Engine engine;

    private Chassis chassis;

    @Valid
    @NotNull
    private Condition condition;

    @NotNull
    private Boolean completed;
}
