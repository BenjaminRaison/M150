package eu.benjaminraison.bzz.m183.endpoints;

import eu.benjaminraison.bzz.m183.data.Comment;
import eu.benjaminraison.bzz.m183.data.ICommentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CommentSearch {

    private final ICommentRepository repository;

    public CommentSearch(ICommentRepository repository) {
        this.repository = repository;
    }

    @GetMapping(path = "/comments/search/getByPost")
    public List<Comment> getCommentsByPost(@RequestParam("postId") long postId) {
        return repository.getByPost(postId).stream().filter(comment -> comment.getParent() == null).collect(Collectors.toList());
    }

}
