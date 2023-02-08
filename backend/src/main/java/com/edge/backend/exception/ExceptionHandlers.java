package com.edge.backend.exception;

import com.edge.backend.exception.customExeptions.EmailAlreadyInUseException;
import com.edge.backend.exception.customExeptions.NoSuchElementFoundException;
import com.edge.backend.exception.response.ErrorResponse;
import com.edge.backend.exception.response.Violation;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class ExceptionHandlers {




    @ExceptionHandler(NoSuchElementFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleNoSuchElementFoundException(NoSuchElementFoundException itemNotFoundException, WebRequest request) {
        log.error("Failed to find the requested element", itemNotFoundException);
        return buildErrorResponse(itemNotFoundException, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(EmailAlreadyInUseException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<Object> handelEmailAlreadyInUseException(EmailAlreadyInUseException emailAlreadyInUseException, WebRequest request) {
        log.error("Email Already In Use Exception", emailAlreadyInUseException);
        return buildErrorResponse(emailAlreadyInUseException, HttpStatus.CONFLICT, request);
    }


    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<Object> handleUnauthorized(AuthenticationException authenticationException, WebRequest request) {
        log.error("Bad credentials", authenticationException);
        return buildErrorResponse(authenticationException, HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<ErrorResponse> onConstraintValidationException(
            ConstraintViolationException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Validation error. Check 'errors' field for details."
        );

        for (ConstraintViolation violation : ex.getConstraintViolations()) {
            errorResponse.addValidationError(violation.getPropertyPath().toString(), violation.getMessage());
        }
        return ResponseEntity.unprocessableEntity().body(errorResponse);
    }



    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            WebRequest request
    ) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Validation error. Check 'errors' field for details."
        );

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errorResponse.addValidationError(fieldError.getField(),
                    fieldError.getDefaultMessage());
        }
        return ResponseEntity.unprocessableEntity().body(errorResponse);
    }



    @ExceptionHandler(InvalidFormatException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<Object> parseError(
            InvalidFormatException ex,
            WebRequest request
    ) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Invalid format error. Cannot deserialize. Check 'errors' field for details."
        );


        List<String> fieldPath = new  ArrayList();
        for(JsonMappingException.Reference ref : ex.getPath()) {
            fieldPath.add(ref.getFieldName());
        }

        errorResponse.addValidationError(fieldPath.stream().collect(Collectors.joining(".")), ex.getOriginalMessage());

        return ResponseEntity.unprocessableEntity().body(errorResponse);
    }

    @ExceptionHandler(JsonMappingException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<Object> parseError(
            JsonMappingException ex,
            WebRequest request
    ) {

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Invalid format error. Cannot deserialize. Check 'errors' field for details."
        );


        List<String> fieldPath = new  ArrayList();
        for(JsonMappingException.Reference ref : ex.getPath()) {
            fieldPath.add(ref.getFieldName());
        }

        errorResponse.addValidationError(fieldPath.stream().collect(Collectors.joining(".")), ex.getOriginalMessage());

        return ResponseEntity.unprocessableEntity().body(errorResponse);
    }




    private ResponseEntity<Object> buildErrorResponse(Exception exception,
                                                      String message,
                                                      HttpStatus httpStatus,
                                                      WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }





    private ResponseEntity<Object> buildErrorResponse(Exception exception,
                                                      String message,
                                                      List<Violation> violations,
                                                      HttpStatus httpStatus,
                                                      WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), message);
        if (violations != null)
            errorResponse.setErrors(violations);
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }





    private ResponseEntity<Object> buildErrorResponse(Exception exception,
                                                      List<Violation> violations,
                                                      HttpStatus httpStatus,
                                                      WebRequest request) {

        return buildErrorResponse(exception, exception.getMessage(), violations, httpStatus, request);
    }


    private ResponseEntity<Object> buildErrorResponse(Exception exception,
                                                      HttpStatus httpStatus,
                                                      WebRequest request) {
        return buildErrorResponse(exception, exception.getMessage(), null, httpStatus, request);
    }





}
