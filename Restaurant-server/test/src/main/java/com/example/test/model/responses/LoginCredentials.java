package com.example.test.model.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(staticName = "of")
@Builder
@Getter
public class LoginCredentials {

    private String email;
    private String password;

}
