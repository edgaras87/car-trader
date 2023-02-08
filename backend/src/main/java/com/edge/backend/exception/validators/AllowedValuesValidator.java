package com.edge.backend.exception.validators;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

@Slf4j
public class AllowedValuesValidator implements ConstraintValidator<AllowedValues, String> {

    private String[] allowedValues;

    @Override
    public void initialize(AllowedValues constraintAnnotation) {

        allowedValues = constraintAnnotation.values();
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || Arrays.asList(allowedValues).contains(value);
    }
}
