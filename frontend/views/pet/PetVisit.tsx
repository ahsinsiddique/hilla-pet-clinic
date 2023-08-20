import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import Pet from "Frontend/generated/com/petclinic/application/data/entity/owner/Pet";
import PetVisitForm from "./PetVisitForm";

export default function PetVisit(props: any) {

    const [owner, setOwner] = useState({} as Owner | any);
    const [selectedPet, setSelectedPet] = useState({} as Pet | any);

    const { ownerId } = useParams();

    const setSelectedItems = (event: any) => {
        owner.selectedPetId = event.id;
        setSelectedPet(owner);
        setSelectedPet(event);
    }
    const onDataSaved = (owner: Owner | any) => {
        setSelectedPet(owner.pets?.find((pet: any) => pet.id === owner.selectedPetId))
        setOwner(owner);
    }
    const fetchData = async () => {
        const data: any = await OwnerEndpoint.findOwner(Number(ownerId));
        setOwner(data);
        setSelectedPet(data.pets.length > 0 ? data.pets[0] : []);
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
                                setSelectedItems(value)
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
            <h4 className="ml-1 color-link">{selectedPet.name} </h4>

            {/*  add pet visits  */}
            <h2 className="color-link align-center">Add Visits</h2>
            {owner && <PetVisitForm {...owner} onDataSaved={onDataSaved} />}

            {/*  pet visits grid */}
            {owner && selectedPet && selectedPet.visits &&
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