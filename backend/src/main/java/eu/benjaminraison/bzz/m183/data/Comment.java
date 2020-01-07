package eu.benjaminraison.bzz.m183.data;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
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
    @ManyToOne
    @JoinColumn(nullable = true)
    public Comment parent;
    @OneToMany(mappedBy = "parent")
    public List<Comment> children;
    @NotEmpty
    private String comment;
    @PastOrPresent
    @NotNull
    private LocalDateTime timestamp;

}
