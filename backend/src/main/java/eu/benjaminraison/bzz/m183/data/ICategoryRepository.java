package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;

public interface ICategoryRepository extends CrudRepository<Category, Long> {

    @Override
    @Secured({"ROLE_ADMIN"})
    void delete(Category entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @Secured({"ROLE_ADMIN"})
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Category> entities);

    @Override
    @Secured({"ROLE_ADMIN"})
    void deleteById(Long aLong);

    @Override
    @Secured({"ROLE_ADMIN"})
    <S extends Category> S save(S entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    <S extends Category> Iterable<S> saveAll(Iterable<S> entities);

}
