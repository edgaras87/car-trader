package com.edge.backend.exception.response;

import com.edge.backend.exception.response.Violation;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@RequiredArgsConstructor
public class ErrorResponse {

    private final int status;
    private final String message;
    private String stackTrace;
    private List<Violation> errors;

    public void addValidationError(String field, String message){
        if(Objects.isNull(errors)){
            errors = new ArrayList<>();
        }
        errors.add(new Violation(field, message));
    }

}
