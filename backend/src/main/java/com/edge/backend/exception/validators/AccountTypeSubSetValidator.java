package com.edge.backend.exception.validators;


import com.edge.backend.enums.AccountType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class AccountTypeSubSetValidator implements ConstraintValidator<AccountTypeSubset, AccountType> {
    private AccountType[] subset;

    @Override
    public void initialize(AccountTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(AccountType value, ConstraintValidatorContext context) {
        return value != null && Arrays.asList(subset).contains(value);
    }
}