package com.edge.backend.exception.validators;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Slf4j
public class DateRangeValidator implements ConstraintValidator< DateBoundary, Date> {

    private long min_timestamp;
    private long max_timestamp;
    private String message;
    private DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE.withZone(ZoneId.from(ZoneOffset.UTC));


    @Override
    public void initialize(DateBoundary constraintAnnotation) {

        min_timestamp = constraintAnnotation.min_timestamp();
        max_timestamp = constraintAnnotation.max_timestamp();
        message = constraintAnnotation.message();

        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Date value, ConstraintValidatorContext context) {

        if (value == null) return true;
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate( String.format("%s - %s: [ %s - %s ]",
            value.toString(), message, formatDate(min_timestamp), formatDate(max_timestamp)
            )).addConstraintViolation();


        if (value.getTime() < min_timestamp || value.getTime() > max_timestamp) return false;

        return true;


    }

    private String formatDate(long timestamp) {
        return formatter.format(Instant.ofEpochMilli(timestamp));
    }
}
