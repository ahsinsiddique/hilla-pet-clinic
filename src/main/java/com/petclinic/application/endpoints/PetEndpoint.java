package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.Pet;
import com.petclinic.application.data.entity.owner.PetType;
import com.petclinic.application.data.repository.OwnerRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.validation.Valid;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.rmi.AlreadyBoundException;
import java.util.Collection;

@Endpoint
@AnonymousAllowed
public class PetEndpoint {
    private OwnerRepository ownerRepository;

    PetEndpoint(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }


    public Pet findPet(@PathVariable("ownerId") int ownerId,
                       @PathVariable(name = "petId", required = false) Integer petId) {
        return petId == null ? new Pet() : this.ownerRepository.findById(ownerId).getPet(petId);
    }

    public Owner findOwner(@PathVariable(name = "ownerId", required = false) Integer ownerId) {
        return ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }

    public Collection<PetType> populatePetTypes() {
        return this.ownerRepository.findPetTypes();
    }

    public Owner processPetCreationForm(Owner owner, @Valid Pet pet) {
        if (StringUtils.hasLength(pet.getName()) && pet.isNew() && owner.getPet(pet.getName(), true) != null) {
            new Exception("name duplicate already exists");
        }
        owner.addPet(pet);
        return this.ownerRepository.save(owner);
    }

}
