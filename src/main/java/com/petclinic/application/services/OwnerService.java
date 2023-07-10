package com.petclinic.application.services;

import com.petclinic.application.data.entity.owner.Owner;
import com.petclinic.application.data.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;

    OwnerService(final OwnerRepository ownerR) {
        this.ownerRepository = ownerR;
    }

    public Owner updateOwner(Owner model) {
        Optional<Owner> owner = this.ownerRepository.findById(model.getId());
        if (owner.isPresent()) {
            Owner _owner = owner.get();
            _owner.setFirstName(model.getFirstName());
            _owner.setLastName(model.getLastName());
            _owner.setCity(model.getCity());
            _owner.setTelephone(model.getTelephone());
            _owner.setAddress(model.getAddress());
            _owner.setEmail(model.getEmail());
            _owner = ownerRepository.save(_owner);
            return _owner;
        } else {
            return null;
        }
    }

    public Owner saveOwner(Owner model) {
        model.isNew();
        return this.ownerRepository.save(model);
    }

    public Owner findOwner(Integer ownerId) {
        return ownerId == null ? new Owner() : this.ownerRepository.findById(ownerId);
    }
    public List<Owner> getAllOwners() {
        return this.ownerRepository.findAll();
    }
}
