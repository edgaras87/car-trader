package com.edge.backend.exception.validators;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.METHOD;

@Constraint(validatedBy = { AllowedValuesValidator.class})
@Retention(RetentionPolicy.RUNTIME)
@Target({PARAMETER, FIELD, TYPE, METHOD})
public @interface AllowedValues {


    String message() default "must be any of {values}";

    String[] values() ;



    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
