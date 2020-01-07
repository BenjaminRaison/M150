package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ICommentRepository extends CrudRepository<Comment, Long> {

    @Query("SELECT c from Comment c where c.post.id = :postId")
    List<Comment> getByPost(long postId);

}
