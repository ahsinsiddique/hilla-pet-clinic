package com.petclinic.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petclinic.application.data.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
