package eu.benjaminraison.bzz.m183;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final M183AuthenticationProvider authenticationProvider;

    public SecurityConfiguration(M183AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().authenticationEntryPoint(getAuthenticationEntryPoint())
                .and()
                .authorizeRequests()
                .antMatchers("/index.html", "/", "/home", "/login").permitAll()
                .anyRequest().authenticated()
                .and()
                .cors() // disables authentication checks on OPTIONS requests
                .and()
                .csrf()
                .csrfTokenRepository(getCsrfTokenRepository()); // otherwise the cookies doesn't apply to /api ?
    }

    // Stops the browser from showing the basic auth popup when asked by an application
    // Performing a direct GET request will still show the dialog
    private AuthenticationEntryPoint getAuthenticationEntryPoint() {
        return (request, response, authException) -> {
            String requestedBy = request.getHeader("X-Requested-With");
            System.out.println("X-Requested-With: " + requestedBy);
            if (requestedBy == null || requestedBy.isEmpty()) {
                response.setHeader("WWW-Authenticate", "Basic realm=M183");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
            } else {
                response.setHeader("WWW-Authenticate", "Application driven");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
            }
        };
    }

    private CsrfTokenRepository getCsrfTokenRepository() {
        CookieCsrfTokenRepository tokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        tokenRepository.setCookiePath("/");
        return tokenRepository;
    }

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }
}

