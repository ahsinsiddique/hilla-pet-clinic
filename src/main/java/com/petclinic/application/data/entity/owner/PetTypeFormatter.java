package com.petclinic.application.data.entity.owner;

import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

import com.petclinic.application.data.repository.OwnerRepository;

import java.text.ParseException;
import java.util.Collection;
import java.util.Locale;

@Component
public class PetTypeFormatter implements Formatter<PetType> {

	private final  OwnerRepository owners;

	
	public PetTypeFormatter(OwnerRepository owners) {
		this.owners = owners;
	}

	@Override
	public String print(PetType petType, Locale locale) {
		return petType.getName();
	}

	@Override
	public PetType parse(String text, Locale locale) throws ParseException {
		Collection<PetType> findPetTypes = this.owners.findPetTypes();
		for (PetType type : findPetTypes) {
			if (type.getName().equals(text)) {
				return type;
			}
		}
		throw new ParseException("type not found: " + text, 0);
	}

}
