package com.edge.backend.models.specification;

import com.edge.backend.models.specification.General;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("specifications")
@Data
public class Specification {

    @Id
    private String id;
    private General general;
    private Performance performance;
    private Engine engine;
    private Chassis chassis;
    private Electric electric;

}
