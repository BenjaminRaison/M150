package eu.benjaminraison.bzz.m183;


import eu.benjaminraison.bzz.m183.data.IUserRepository;
import eu.benjaminraison.bzz.m183.data.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class M183AuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        User u = new User();
        u.setEmail("email@email.email");
        u.setUsername("user1");
        u.setPassword(passwordEncoder.encode("user1Pass"));
        userRepository.save(u);

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        User user = userRepository.findByUsername(name);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return new UsernamePasswordAuthenticationToken(
                        name, password, new ArrayList<>());
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}