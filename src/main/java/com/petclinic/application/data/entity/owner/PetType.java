package com.petclinic.application.data.entity.owner;

import com.petclinic.application.data.entity.NamedEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "types")
public class PetType extends NamedEntity {

}
