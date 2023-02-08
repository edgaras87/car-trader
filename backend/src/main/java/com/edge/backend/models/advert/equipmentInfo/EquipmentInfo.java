package com.edge.backend.models.advert.equipmentInfo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EquipmentInfo {
    @NotNull
    private InteriorExterior interiorExterior;
    @NotNull
    private Safety safety;
    @NotNull
    private Comfort comfort;
    @NotNull
    private Infotainment infotainment;
    @NotNull
    private Extra extra;
    @NotNull
    private Boolean completed;
}
