package eu.benjaminraison.bzz.m183.data;

import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
}
