package com.edge.backend.models.specification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chassis {
    private String gear;
    private String transmission;
    private String drivewheels;
}
