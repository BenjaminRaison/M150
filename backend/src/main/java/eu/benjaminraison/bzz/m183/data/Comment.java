package eu.benjaminraison.bzz.m183.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(generator = "gen_comment")
    private Long id;
    @ManyToOne
    @NotNull
    private Post post;
    @ManyToOne
    @NotNull
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = true)
    @JsonIgnore // StackOverflow otherwise
    public Comment parent;
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    public List<Comment> children;
    @NotEmpty
    @Size(max = 1024)
    private String comment;
    @PastOrPresent
    @NotNull
    private LocalDateTime timestamp;

}
