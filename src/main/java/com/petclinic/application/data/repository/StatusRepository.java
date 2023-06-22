package com.petclinic.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petclinic.application.data.entity.Status;

public interface StatusRepository extends JpaRepository<Status, Long> {

}
