package com.petclinic.application.data.vet;

import com.petclinic.application.data.entity.NamedEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialties")
public class Specialty extends NamedEntity {

}
