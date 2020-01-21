package eu.benjaminraison.bzz.m150.data;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDateTime;

@Entity
@Data
@SequenceGenerator(name = "seq", initialValue = 5)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private Long id;

    @NotBlank
    @Length(max = 80)
    private String title;

    @NotNull
    @ManyToOne
    private User author;

    @NotBlank
    @Length(max = 15000)
    private String content;

    @NotNull
    @ManyToOne
    private Category category;

    @NotNull
    @PastOrPresent
    private LocalDateTime uploaded = LocalDateTime.now();

}
