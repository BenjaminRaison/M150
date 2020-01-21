package eu.benjaminraison.bzz.m150.endpoints;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class Login {

    // This is a trick to force a login if the user is not authenticated.
    // If the user is authenticated, it will return the user information,
    // else, a 401 Not Authorised is returned, triggering authentication
    @GetMapping("/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }

}
