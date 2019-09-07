package eu.benjaminraison.bzz.m183.data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn
    private List<Right> rights;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Right> getRights() {
        return Objects.requireNonNullElseGet(rights, ArrayList::new);
    }

    public void setRights(List<Right> rights) {
        this.rights = rights;
    }
}
