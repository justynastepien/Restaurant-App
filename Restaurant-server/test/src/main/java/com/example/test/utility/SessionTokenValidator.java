package com.example.test.utility;

import com.example.test.model.SessionRepository;
import com.example.test.model.UserRepository;
import com.example.test.model.Session;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;

@AllArgsConstructor
@Component
public class SessionTokenValidator {

    private final SessionRepository sessionRepository;
    private final UserRepository usersRepository;

    public void validateUser(final String token) {
        final var session = sessionRepository.findByToken(token).orElseThrow(
                () -> { throw new EntityNotFoundException("Invalid session token provided"); }
        );
        if(session.getExpirationDate().isBefore(LocalDateTime.now())) {
            sessionRepository.deleteById(session.getId());
            throw new IllegalStateException("Session expired");
        }
        renewSession(session);
    }

    @SuppressWarnings("OptionalGetWithoutIsPresent")
    public void validateAdmin(final String token) throws AccessDeniedException {
        final var session = sessionRepository.findByToken(token).orElseThrow(
                () -> { throw new EntityNotFoundException("Invalid session token provided"); }
        );
        var user = usersRepository.findByEmail(session.getUser().getEmail()).get();
        if(!user.getIsAdmin()) {
            throw new AccessDeniedException("User needs Administrator status to proceed this operation");
        }
        if(session.getExpirationDate().isBefore(LocalDateTime.now())) {
            sessionRepository.deleteById(session.getId());
            throw new IllegalStateException("Session expired");
        }
        renewSession(session);
    }

    private void renewSession(final Session session) {
        session.setExpirationDate(LocalDateTime.now().plusMinutes(20));
        sessionRepository.save(session);
    }

}
