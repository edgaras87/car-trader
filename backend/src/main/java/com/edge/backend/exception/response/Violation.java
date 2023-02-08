package com.edge.backend.exception.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class Violation {
    private final String field;
    private final String message;
}
