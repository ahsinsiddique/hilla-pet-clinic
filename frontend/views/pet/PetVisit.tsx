import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import Pet from "Frontend/generated/com/petclinic/application/data/entity/owner/Pet";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetVisitForm from "./PetVisitForm";

export default function PetVisit() {
    const [owner, setOwner] = useState({} as Owner);
    const [selectedPet, setSelectedPet] = useState({} as Pet);
    const { ownerId } = useParams();
    
    const onDataSaved = (owner: Owner) => {
        const pet = owner.pets?.find((pet) => pet && pet.id === selectedPet.id);
        setOwner(owner);
        setSelectedPet(pet as Pet);
    }
    const fetchData = async () => {
        const _owner = await OwnerEndpoint.findOwner(Number(ownerId));
        setOwner(_owner as Owner);
        setSelectedPet(_owner && _owner.pets
            && _owner.pets.length > 0 ? _owner.pets[0] as Pet : {} as Pet);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container mt-2">
            <h3>Owner Name</h3>
            {owner && <h4 className="color-link ml-1">{owner.firstName + ' ' + owner.lastName}</h4>}
            {/* Owner pets grid */}
            <>
                {owner &&
                    <>
                        <h2 className="mt-1 mb-1">Pets </h2>
                        <Grid
                            items={owner.pets}
                            onActiveItemChanged={({ detail: { value } }) =>
                                setSelectedPet(value as Pet)
                            }  >
                            <GridColumn header="Name" >
                                {({ item }) => <span className="color-link">{item.name}</span>}
                            </GridColumn>
                            <GridColumn header="Pet Type" >
                                {({ item }) => <span>{item.type.name}</span>}
                            </GridColumn>

                            <GridColumn path="birthDate" />
                        </Grid>
                    </>
                }
            </>
            <h3 className="mt-1">Pet Name</h3>
            {selectedPet && selectedPet.id && <h4 className="ml-1 color-link">{selectedPet.name} </h4>}

            {/*  add pet visits  */}
            <h2 className="color-link align-center">Add Visits</h2>
            {owner && <PetVisitForm {...selectedPet} onDataSaved={onDataSaved} />}

            {/*  pet visits grid */}
            {owner && selectedPet && selectedPet.id && selectedPet.visits &&
                <>
                    <h2 className="mt-1 mb-1">Visits </h2>
                    <Grid
                        items={selectedPet.visits}
                    >
                        <GridColumn header="Description" >
                            {({ item }) => <span className="color-link">{item.description}</span>}
                        </GridColumn>
                        <GridColumn header="Date" >
                            {({ item }) => <span>{item.date}</span>}
                        </GridColumn>
                    </Grid>
                </>
            }
        </div>
    )
}