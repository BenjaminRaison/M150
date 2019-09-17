package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.annotation.Secured;

public interface IUserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    @Override
    @Secured({"ROLE_ADMIN"})
    Iterable<User> findAll();

    @Override
    @Secured({"ROLE_ADMIN"})
    void delete(User entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    void deleteAll();

    @Override
    @Secured({"ROLE_ADMIN"})
    void deleteAll(Iterable<? extends User> entities);

    @Override
    @Secured({"ROLE_ADMIN"})
    void deleteById(Long aLong);

    @Override
    @Secured({"ROLE_ADMIN"})
    <S extends User> S save(S entity);

    @Override
    @Secured({"ROLE_ADMIN"})
    <S extends User> Iterable<S> saveAll(Iterable<S> entities);
}
