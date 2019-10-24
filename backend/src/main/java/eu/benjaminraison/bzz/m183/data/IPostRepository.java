package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;

public interface IPostRepository extends CrudRepository<Post, Long> {

    @Override
    @Secured({"ROLE_EDITOR"})
    void delete(Post entity);

    @Override
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Post> entities);

    @Override
    @Secured({"ROLE_EDITOR"})
    void deleteById(Long aLong);

    @Override
    @Secured({"ROLE_EDITOR"})
    <S extends Post> S save(S entity);

    @Override
    @Secured({"ROLE_EDITOR"})
    <S extends Post> Iterable<S> saveAll(Iterable<S> entities);

}
