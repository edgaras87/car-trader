package com.edge.backend.models.specification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Engine {
    private Integer power;
    private Integer cubicCapacity;
}
