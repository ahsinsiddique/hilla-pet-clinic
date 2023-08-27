package com.petclinic.application.data.repository;

import com.petclinic.application.data.entity.owner.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Transactional
public interface PetRepository extends JpaRepository<Pet, Long> {

    @Modifying
    @Query(value = "insert into pets (owner_id,  birth_date, name, type_id, version) " +
            " values (?, ?, ?, ?,?)", nativeQuery = true)
    void createNewPet(Long ownerId, LocalDate birthDate, String name, Long typeId, int version );

    @Modifying
    @Query(value = " update pets set birth_date = ?1, name = ?2, type_id=?3 where id=?4", nativeQuery = true)
    void updatePet( LocalDate birthDate, String name, Long typeId, Long id );
}
