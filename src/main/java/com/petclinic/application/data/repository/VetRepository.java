package com.petclinic.application.data.repository;

import com.petclinic.application.data.vet.Vet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VetRepository extends JpaRepository<Vet, Long> {
}
