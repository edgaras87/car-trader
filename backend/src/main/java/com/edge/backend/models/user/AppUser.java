package com.edge.backend.models.user;


import com.edge.backend.enums.AccountType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.*;

@Document("users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppUser {
    @Id
    private String id;

    @Null
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ZonedDateTime createdAt;

    @NotBlank
    @Size(max = 20)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @Size(max = 120)
    private String name;

    @Size(max = 120)
    private String vatNumber;

    @NotBlank
    private AccountType account;

    @DBRef
    private Set<Role> roles = new HashSet<>();


    public AppUser(ZonedDateTime date, String email, String password, AccountType account, String vatNumber) {

        this.createdAt = date;
        this.email = email;
        this.password = password;
        this.account = account;
        this.name = null;
        this.vatNumber = vatNumber;

    }

}
