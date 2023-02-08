package com.edge.backend.controllers;

import com.edge.backend.exception.customExeptions.EmailAlreadyInUseException;
import com.edge.backend.models.user.AppUser;
import com.edge.backend.enums.ERole;
import com.edge.backend.models.user.Role;
import com.edge.backend.payload.request.LoginRequest;
import com.edge.backend.payload.request.SignupRequest;
import com.edge.backend.payload.response.JwtResponse;
import com.edge.backend.payload.response.MessageResponse;
import com.edge.backend.repositories.RoleRepository;
import com.edge.backend.repositories.UserRepository;
import com.edge.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    /**
     * authenticates user and in return generates JWT token
     * @param loginRequest
     * @return - JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt, "You have successfully log-in"));
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupRequest signupRequest) {

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new EmailAlreadyInUseException("Error: Email is already in use!");
        }

        AppUser user = new AppUser(
                    ZonedDateTime.now(),
                    signupRequest.getEmail(),
                    passwordEncoder.encode(signupRequest.getPassword()),
                    signupRequest.getAccount(),
                    signupRequest.getVatNumber()
        );

        //Set<String> strRoles = signupRequest.getRoles();


        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(()-> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("You have successfully register new account"));
    }




}
