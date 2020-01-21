package eu.benjaminraison.bzz.m150.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
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
    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_rights",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "right_id")
    )
    private List<Right> rights;

    public List<Right> getRights() {
        return Objects.requireNonNullElseGet(rights, ArrayList::new);
    }

}
