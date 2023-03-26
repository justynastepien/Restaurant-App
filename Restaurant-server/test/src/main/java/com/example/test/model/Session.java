package com.example.test.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class Session {
    @Id
    @Getter(value = AccessLevel.PUBLIC)
    @Setter(value = AccessLevel.PUBLIC)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter(value = AccessLevel.PUBLIC)
    @Setter(value = AccessLevel.PUBLIC)
    private String token;

    @Getter(value = AccessLevel.PUBLIC)
    @Setter(value = AccessLevel.PUBLIC)
    private LocalDateTime expirationDate;

    @Getter(value = AccessLevel.PUBLIC)
    @Setter(value = AccessLevel.PUBLIC)
    @OneToOne
    private User user;
}
