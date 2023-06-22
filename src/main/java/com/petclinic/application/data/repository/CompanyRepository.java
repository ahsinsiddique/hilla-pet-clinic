package com.petclinic.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petclinic.application.data.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
