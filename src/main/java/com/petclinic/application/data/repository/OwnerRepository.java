package com.petclinic.application.data.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.PetType;

import jakarta.transaction.Transactional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
	@Query("SELECT ptype FROM PetType ptype ORDER BY ptype.name")
	@Transactional()
	List<PetType> findPetTypes();

	@Query("SELECT owner FROM Owner owner left join fetch owner.pets WHERE owner.id =:id")
	@Transactional()
	Owner findById(@Param("id") Integer id);

	@Query("SELECT DISTINCT owner FROM Owner owner left join  owner.pets WHERE owner.lastName LIKE :lastName% ")
	@Transactional()
	List<Owner> findByLastName(@Param("lastName") String lastName);
	
}
