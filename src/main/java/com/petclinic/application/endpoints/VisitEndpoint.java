package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.Visit;
import com.petclinic.application.data.repository.OwnerRepository;
import com.petclinic.application.services.OwnerService;
import com.vaadin.flow.router.NotFoundException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.ModelAttribute;

@Endpoint
@AnonymousAllowed
public class VisitEndpoint {
    private OwnerRepository ownerRepository;
    private final OwnerService ownerService;

    VisitEndpoint(
            final OwnerRepository ownerRepository,final OwnerService ownerService) {
        this.ownerRepository = ownerRepository;
        this.ownerService = ownerService;
    }


    public Owner processNewVisitForm(Long ownerId, int petId, @Valid Visit visit) {
      Owner owner =   this.ownerRepository.findById(ownerId).orElseThrow(NotFoundException::new);
        owner.addVisit(petId, visit);
        return this.ownerService.saveOwner(owner);
    }
}
