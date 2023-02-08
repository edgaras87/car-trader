package com.edge.backend.exception.customExeptions;

public class DateOutOfBaundaryException extends RuntimeException {
    public DateOutOfBaundaryException(String message) {
        super(message);
    }
}
