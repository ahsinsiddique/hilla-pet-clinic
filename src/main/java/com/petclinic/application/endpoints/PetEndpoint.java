package com.petclinic.application.endpoints;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.entity.owner.Pet;
import com.petclinic.application.data.entity.owner.PetType;
import com.petclinic.application.data.repository.OwnerRepository;
import com.petclinic.application.data.repository.PetRepository;
import com.vaadin.flow.router.NotFoundException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.validation.Valid;
import org.springframework.util.StringUtils;

import java.util.Collection;

@Endpoint
@AnonymousAllowed
public class PetEndpoint {
    private OwnerRepository ownerRepository;
    private PetRepository petRepository;

    PetEndpoint(final OwnerRepository ownerR,
                final  PetRepository petRepository) {
        this.ownerRepository = ownerR;
        this.petRepository = petRepository;
    }


    public Pet findPet(int ownerId,
                       Integer petId) {
        return petId == null ? new Pet() : this.ownerRepository.findById(ownerId).getPet(petId);
    }

    public Owner findOwner(Integer ownerId) {
        return ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }

    public Collection<PetType> populatePetTypes() {
        return this.ownerRepository.findPetTypes();
    }

    public Owner processPetCreationForm(Owner owner, @Valid Pet pet) {
        if (StringUtils.hasLength(pet.getName()) && pet.isNew() && owner.getPet(pet.getName(), true) != null) {
            new Exception("name duplicate already exists");
        }
         this.petRepository.createNewPet(owner.getId(), pet.getBirthDate(), pet.getName(),
                pet.getType().getId(), owner.getVersion());
        Owner _owner = ownerRepository.findById(owner.getId()).orElseThrow(NotFoundException::new);
        return _owner;
    }

    public Owner processUpdateForm(@Valid Pet pet, Owner owner) {
        this.petRepository.updatePet(pet.getBirthDate(),pet.getName(), pet.getType().getId(), pet.getId());
        return ownerRepository.findById(owner.getId()).orElseThrow(NotFoundException::new); // get latest data
    }

}
