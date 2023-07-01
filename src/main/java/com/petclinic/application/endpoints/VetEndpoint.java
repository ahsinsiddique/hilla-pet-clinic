package com.petclinic.application.endpoints;

import com.petclinic.application.data.repository.VetRepository;
import com.petclinic.application.data.vet.Vet;
import com.petclinic.application.data.vet.Vets;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class VetEndpoint {
    private VetRepository vetRepository;

    Vets showResourcesVetList() {
        // Here we are returning an object of type 'Vets' rather than a collection of Vet
        // objects so it is simpler for JSon/Object mapping
        Vets vets = new Vets();
        vets.getVetList().addAll(this.vetRepository.findAll());
        return vets;
    }

    VetEndpoint(
                final VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    public List<Vet> getAllVets() {
        return this.vetRepository.findAll();
    }
}
