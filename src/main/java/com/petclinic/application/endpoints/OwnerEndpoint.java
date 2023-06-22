package com.petclinic.application.endpoints;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class OwnerEndpoint {
    private OwnerRepository ownerRepository;

    OwnerEndpoint(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }

    public List<Owner> getOwners() {
        return ownerRepository.findAll();
    }

    public Owner findOwner(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        return ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }
}
