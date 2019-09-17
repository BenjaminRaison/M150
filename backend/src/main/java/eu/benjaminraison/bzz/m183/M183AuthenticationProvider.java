package eu.benjaminraison.bzz.m183;


import eu.benjaminraison.bzz.m183.data.IUserRepository;
import eu.benjaminraison.bzz.m183.data.User;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class M183AuthenticationProvider implements AuthenticationProvider {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public M183AuthenticationProvider(IUserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = this.passwordEncoder();
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        User user = userRepository.findByUsername(name);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return new UsernamePasswordAuthenticationToken(
                        name, password, user.getRights());
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

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
