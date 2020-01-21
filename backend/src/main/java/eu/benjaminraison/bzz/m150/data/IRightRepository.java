package eu.benjaminraison.bzz.m150.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface IRightRepository extends CrudRepository<Right, Long> {
}
