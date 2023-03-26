package com.example.test.service;

import com.example.test.model.SessionRepository;
import com.example.test.model.User;
import com.example.test.model.UserRepository;
import com.example.test.model.Session;
import com.example.test.model.responses.LoginCredentials;

import com.example.test.model.responses.SessionResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository repository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, SessionRepository sessionRepository){
        this.repository = repository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User gettingUserById(int id){

        if(repository.findById(id).isPresent()){
            return repository.findById(id).get();
        }
        return null;
    }

    public List<User> gettingUsers(){

        if(!repository.findAll().isEmpty()){
            return repository.findAll();
        }
        return null;
    }

    public User createUser(User newUser){
//        User result = repository.save(toCreate);
//        return result;
        if(repository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new EntityExistsException("User with identical email address already exists");
        }
        var encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        newUser.setIsActive(true);
        newUser.setIsAdmin(false);
        User result = repository.save(newUser);
        return result;
    }

    public SessionResponse login(final LoginCredentials credentials) {
        if(sessionRepository.existsByUserEmail(credentials.getEmail())) {
            throw new EntityExistsException("User with given email and password already has a valid session");
        }
        var optional = repository.findByEmail(credentials.getEmail());
        if(optional.isEmpty()) {
            throw new EntityNotFoundException("Account with given email does not exist");
        }
        if(!passwordEncoder.matches(credentials.getPassword(), optional.get().getPassword())) {
            throw new IllegalArgumentException("Account with given email and password does not exist");
        }
        var newSession = Session.of(
                null,
                UUID.randomUUID().toString(),
                LocalDateTime.now().plusMinutes(20),
                optional.get());
        var newSessionResponse = SessionResponse.of(
                optional.get().getId(),
                newSession.getToken());
        sessionRepository.save(newSession);
        return newSessionResponse;
    }

    @Transactional
    @SuppressWarnings("OptionalGetWithoutIsPresent")
    public void logout(final String sessionToken) {
        sessionRepository.deleteById(sessionRepository.findByToken(sessionToken).get().getId());
    }
}
