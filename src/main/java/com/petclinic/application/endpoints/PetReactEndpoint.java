package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.Pet;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.PathVariable;

@Endpoint
@AnonymousAllowed
public class PetReactEndpoint {
    private OwnerRepository ownerRepository;

    PetReactEndpoint(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }


    public Pet findPet(@PathVariable("ownerId") int ownerId,
                       @PathVariable(name = "petId", required = false) Integer petId) {
        return petId == null ? new Pet() : this.ownerRepository.findById(ownerId).getPet(petId);
    }

    public Owner findOwner(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        return null;//ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }
}
