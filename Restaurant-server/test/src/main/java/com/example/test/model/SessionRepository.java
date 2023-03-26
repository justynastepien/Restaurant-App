package com.example.test.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    boolean existsByUserEmail(String email);

    Optional<Session> findByToken(String token);
}
