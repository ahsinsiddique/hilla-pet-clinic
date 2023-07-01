package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.PathVariable;

@Endpoint
@AnonymousAllowed
public class OwnerEndpoint {
    private OwnerRepository ownerRepository;

    OwnerEndpoint(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }

    public Owner getOwners(Integer id) {
        System.out.println("owners data");
        return ownerRepository.findById(id);
    }

    public Owner findOwner(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        return null;//ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }
}
