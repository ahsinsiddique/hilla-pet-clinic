import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import { useEffect, useState } from "react";
import PetForm from "../pet/PetForm";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import Pet from "Frontend/generated/com/petclinic/application/data/entity/owner/Pet";

export default function OwnerInformationForm(props: any) {

    const [owner, setOwner] = useState([] as Array<Owner> | any);
    const [isEditOwner, setIsEditOwner] = useState(false);
    const [isNewPet, setIsNewPet] = useState(false);
    const [isVisitPage, setVisitPageStatus] = useState(false);
    const { ownerId } = useParams();
    // const location = useLocation();
    const navigate = useNavigate();
    const setSelectedItems = (pet: Pet[]) => {
        // event is selected pet
        navigate(`/pet/${pet[0].id}`, {state: owner});
        setOwner(owner);
    }

    const onDataSaved = (owner: Owner) => {
        setIsEditOwner(false);
        setIsNewPet(false);
        setOwner([owner]);
    }
    const fetchData = async () => {
        //console.log(location.state);
        const data: any = await OwnerEndpoint.findOwner(Number(ownerId));
        setOwner(data);
    }

    useEffect(() => {
        fetchData();
        //  setOwner(props.owner.selectedItems)
    }, [])
    return (
        <div className="container">
            {!isNewPet && <h2 className="mb-2">Owner Information</h2>}
            {!isNewPet && !isEditOwner &&
                <>
                    {owner && owner.id &&
                        <>
                            <HorizontalLayout className="align-center" theme="spacing">
                                <TextField
                                    style={{ width: "30%" }}
                                    name="name"
                                    label="Name"
                                    value={owner && owner.firstName}
                                    readonly
                                ></TextField>
                                <TextField
                                    style={{ width: "30%" }}
                                    name="address"
                                    label="Address"
                                    value={owner && owner.address}
                                    readonly
                                ></TextField>
                            </HorizontalLayout>
                            <HorizontalLayout className="align-center" theme="spacing">
                                <TextField
                                    style={{ width: "30%" }}
                                    name="city"
                                    label="City"
                                    value={owner && owner.city}
                                    readonly
                                ></TextField>
                                <TextField
                                    style={{ width: "30%" }}
                                    name="telephone"
                                    label="telephone"
                                    value={owner && owner.telephone}
                                    readonly
                                ></TextField>
                            </HorizontalLayout>
                        </>
                    }

                    {!isVisitPage && <div className="mt-1 align-center">
                        <Button theme="primary" onClick={() => navigate('/owner-form', { state: owner })}
                        >Update Owner</Button>
                        <Button theme="primary" style={{ marginLeft: '1rem' }}
                            onClick={() => { navigate('/pet/new', { state: owner }) }}
                        >Add New Pet
                        </Button>
                        {owner.id && owner.pets.length > 0 && <Button theme="secondary"
                            style={{ marginLeft: '1rem' }}
                            onClick={() => navigate(`/owner/${owner.id}/pets-visit-details`)}
                        >
                            Pets Visit Details
                        </Button>}
                    </div>}
                </>

            }
            {/* {isEditOwner && <OwnerForm {...owner} onDataSaved={onDataSaved} />} */}

            {owner.id &&
                <>
                    <h2 className="mt-1">Pets</h2>
                    <Grid
                        items={owner.pets}
                        onActiveItemChanged={({ detail: { value } }) =>
                            setSelectedItems(value ? [value] : [])
                        }  >
                        <GridColumn header="Name" >
                            {({ item }) => <span className="color-link">{item.name}</span>}
                        </GridColumn>
                        <GridColumn header="Pet Type" >
                            {({ item }) => <span>{item.type.name}</span>}
                        </GridColumn>

                        <GridColumn path="birthDate" />
                    </Grid>
                </>}
            {/* {(isNewPet || (owner && owner.selectedPet && owner[0].selectedPet.length > 0)) &&
                <PetForm {...owner} onDataSaved={onDataSaved} />} */}
        </div>
    )
}