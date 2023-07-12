package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.Visit;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.ModelAttribute;

@Endpoint
@AnonymousAllowed
public class VisitEndpoint {
    private OwnerRepository ownerRepository;

    VisitEndpoint(
            final OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    public Owner processNewVisitForm(@ModelAttribute Owner owner, int petId, @Valid Visit visit) {
        owner.addVisit(petId, visit);
        return this.ownerRepository.save(owner);
    }
}
