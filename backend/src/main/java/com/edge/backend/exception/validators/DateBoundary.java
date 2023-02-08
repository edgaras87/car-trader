
package com.edge.backend.exception.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Formatter;

import static java.lang.String.format;
import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.FIELD;

@Constraint(validatedBy = { DateRangeValidator.class})
@Retention(RetentionPolicy.RUNTIME)
@Target({PARAMETER, FIELD, TYPE, METHOD})
public @interface DateBoundary {


    String message() default "date is out of bounds";

    long min_timestamp() default 0L;             // 1970-01-01
    long max_timestamp() default 4102441200000L; // 2099-12-31



    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
