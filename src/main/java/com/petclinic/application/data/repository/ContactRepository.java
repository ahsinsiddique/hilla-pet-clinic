package com.petclinic.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petclinic.application.data.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}
