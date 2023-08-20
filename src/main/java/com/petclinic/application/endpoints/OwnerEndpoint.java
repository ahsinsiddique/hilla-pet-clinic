package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.services.OwnerService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class OwnerEndpoint {
    private final OwnerService ownerService;

    OwnerEndpoint(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    public List<Owner> getOwners() {
        return this.ownerService.getAllOwners();
    }

    public Owner findOwner(Integer ownerId) {
        return this.ownerService.findOwner(ownerId);
    }

    @Transactional
    public Owner processCreationForm(Owner owner) {
        return ownerService.saveOwner(owner);
    }

    public Owner initUpdateOwnerForm(Owner model) {
        return this.ownerService.updateOwner(model);
    }


}
