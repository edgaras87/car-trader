package com.edge.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class LoginRequest {

    @NotBlank
    @Size(min = 5,max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 3, max = 40)
    private String password;
}
