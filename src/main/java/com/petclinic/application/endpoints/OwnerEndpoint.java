package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.OwnerRepository;
import com.petclinic.application.services.OwnerService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class OwnerEndpoint {
    private final OwnerRepository ownerRepository;
    private final OwnerService ownerService;

    OwnerEndpoint(final OwnerRepository ownerR, final OwnerService ownerService) {
        this.ownerRepository = ownerR;
        this.ownerService = ownerService;
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

    public Owner initUpdateOwnerForm(Owner model) {
        return this.ownerService.saveOwner(model);
    }


}
