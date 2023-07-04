package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class OwnerEndpoint {
    private final OwnerRepository ownerRepository;

    OwnerEndpoint(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }

    public List<Owner> getOwners() {
        return ownerRepository.findAll();
    }

    public Owner findOwner(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        return ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }

    public Owner processCreationForm(Owner owner) {
        return ownerRepository.save(owner);
    }

}
