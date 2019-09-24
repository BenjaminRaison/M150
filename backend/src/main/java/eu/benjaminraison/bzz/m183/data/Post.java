package eu.benjaminraison.bzz.m183.data;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDateTime;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Length(max = 80)
    private String title;

    @ManyToOne(optional = false)
    private User author;

    @NotBlank
    @Length(max = 2500)
    private String content;

    @NotNull
    @PastOrPresent
    private LocalDateTime uploaded;

}
