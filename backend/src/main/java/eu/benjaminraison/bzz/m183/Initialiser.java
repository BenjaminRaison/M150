package eu.benjaminraison.bzz.m183;

import eu.benjaminraison.bzz.m183.data.IUserRepository;
import eu.benjaminraison.bzz.m183.data.User;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Initialiser {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Initialiser(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initTestData() {
        User u = new User();
        u.setEmail("email@email.email");
        u.setUsername("user1");
        u.setPassword(passwordEncoder.encode("user1Pass"));
        userRepository.save(u);
    }
}
