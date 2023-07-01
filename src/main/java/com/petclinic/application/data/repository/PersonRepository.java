package com.petclinic.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petclinic.application.data.entity.Person;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query(value = "select * from person", nativeQuery = true)
    List<Person> getPersons();
}
