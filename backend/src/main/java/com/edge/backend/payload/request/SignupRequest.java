package com.edge.backend.payload.request;

import com.edge.backend.enums.AccountType;
import com.edge.backend.exception.validators.AccountTypeSubset;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SignupRequest {

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    //private Set<String> roles;

    @NotBlank
    @Size(min = 3, max = 40)
    private String password;


    @AccountTypeSubset(anyOf = {AccountType.Dealer, AccountType.Private})
    private AccountType account;


    private String vatNumber;

}
