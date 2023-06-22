package com.petclinic.application.endpoints;

import java.util.List;

import com.petclinic.application.data.entity.Company;
import com.petclinic.application.data.repository.CompanyRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import jakarta.annotation.Nonnull;

@Endpoint
@AnonymousAllowed
public class CompanyReactEndpoint {
    private CompanyRepository companyRepository;

    CompanyReactEndpoint(final CompanyRepository companyR) {
        this.companyRepository = companyR;
    }

    @Nonnull
    public String sayHello(@Nonnull String name) {
        if (name.isEmpty()) {
            return "Hello stranger";
        } else {
            return "Hello " + name;
        }
    }

    public List<Company> getCompanies() {
        return companyRepository.findAll();
    }
}
