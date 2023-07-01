package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.Person;
import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.PersonRepository;
import com.petclinic.application.data.vet.Vet;
import com.petclinic.application.data.vet.VetRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class VetEndpoint {
    private VetRepository vetRepository;
    private PersonRepository personRepository;

    VetEndpoint(final VetRepository vetRep,
                final PersonRepository personR) {
        this.vetRepository = vetRep;
        this.personRepository = personR;
    }

    public List<Vet> getOwners() {
        System.out.println("owners data");
        getPersons(1);
        return vetRepository.findAll();
    }

    public List<Person> getPersons(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        System.out.println("persons data");

        return this.personRepository.findAll();//ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }
}
