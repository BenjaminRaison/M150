package eu.benjaminraison.bzz.m183;

import eu.benjaminraison.bzz.m183.data.IRightRepository;
import eu.benjaminraison.bzz.m183.data.IUserRepository;
import eu.benjaminraison.bzz.m183.data.Right;
import eu.benjaminraison.bzz.m183.data.User;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Initialiser {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IRightRepository rightRepository;

    public Initialiser(IUserRepository userRepository, PasswordEncoder passwordEncoder, IRightRepository rightRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.rightRepository = rightRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initTestData() {
        var rightAdmin = new Right();
        rightAdmin.setRight("ROLE_ADMIN");
        rightRepository.save(rightAdmin);

        var rightEditor = new Right();
        rightEditor.setRight("ROLE_EDITOR");
        rightRepository.save(rightEditor);

        var rightUser = new Right();
        rightUser.setRight("ROLE_USER");
        rightRepository.save(rightUser);


        var admin = new User();
        admin.setEmail("admin@m182.com");
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("adminpass"));
        admin.setRights(List.of(rightAdmin, rightEditor, rightUser));
        userRepository.save(admin);

        var editor = new User();
        editor.setEmail("editor@m182.com");
        editor.setUsername("editor");
        editor.setPassword(passwordEncoder.encode("editorpass"));
        editor.setRights(List.of(rightEditor, rightUser));
        userRepository.save(editor);

        var user = new User();
        user.setEmail("user@m182.com");
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("userpass"));
        user.setRights(List.of(rightUser));
        userRepository.save(user);
    }
}
