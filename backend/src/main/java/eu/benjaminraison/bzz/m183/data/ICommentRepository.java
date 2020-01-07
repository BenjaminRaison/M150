package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

@RestResource
public interface ICommentRepository extends CrudRepository<Comment, Long> {

    @Query("SELECT c from Comment c where c.post.id = :postId")
    List<Comment> getByPost(long postId);

    @Override
    @Secured({"ROLE_ADMIN"})
    void delete(Comment entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @Secured({"ROLE_ADMIN"})
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Comment> entities);

    @Override
    @Secured({"ROLE_ADMIN"})
    void deleteById(Long aLong);

    @Override
    @RestResource(exported = false)
    <S extends Comment> S save(S entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    @RestResource(exported = false)
    <S extends Comment> Iterable<S> saveAll(Iterable<S> entities);

}