import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import { useEffect, useState } from "react";
import OwnerForm from "./OwnerForm";
import PetForm from "./PetForm";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";

export default function OwnerInformationForm(props: any) {

    const [owner, setOwner] = useState([] as Array<Owner>);
    const [isEditOwner, setIsEditOwner] = useState(false);
    const [isNewPet, setIsNewPet] = useState(false);
    const setSelectedItems = (event: any) => {
        console.log(event)
    }

    const onDataSaved = (owner: Owner) => {
        setIsEditOwner(false);
        setOwner([owner]);
    }
    useEffect(() => {
        setOwner(props.owner.selectedItems)
    }, [])
    return (
        <div className="container">
            {!isNewPet && <h2 className="mb-2">Owner Information</h2>}
            {!isNewPet && !isEditOwner &&
                <>
                    {owner.length > 0 &&
                        <>
                            <HorizontalLayout className="align-center" theme="spacing">
                                <TextField
                                    style={{ width: "30%" }}
                                    name="name"
                                    label="Name"
                                    value={owner && owner[0].firstName}
                                    readonly
                                ></TextField>
                                <TextField
                                    style={{ width: "30%" }}
                                    name="address"
                                    label="Address"
                                    value={owner && owner[0].address}
                                    readonly
                                ></TextField>
                            </HorizontalLayout>
                            <HorizontalLayout className="align-center" theme="spacing">
                                <TextField
                                    style={{ width: "30%" }}
                                    name="city"
                                    label="City"
                                    value={owner && owner[0].city}
                                    readonly
                                ></TextField>
                                <TextField
                                    style={{ width: "30%" }}
                                    name="telephone"
                                    label="telephone"
                                    value={owner && owner[0].telephone}
                                    readonly
                                ></TextField>
                            </HorizontalLayout>
                        </>
                    }

                    <div className="mt-1 align-center">
                        <Button theme="primary" onClick={() => setIsEditOwner(true)}
                        >Update Owner</Button>
                        <Button theme="primary" style={{ marginLeft: '1rem' }} onClick={() => setIsNewPet(true)}
                        >Add New Pet</Button>
                    </div>
                </>

            }

            {
                isEditOwner && <OwnerForm {...owner} onDataSaved={onDataSaved} />
            }

            {!isNewPet && <h2 className="mt-1">Pets</h2>}

            {!isNewPet && owner.length > 0 && <Grid
                items={owner[0].pets}
                onActiveItemChanged={({ detail: { value } }) =>
                    setSelectedItems(value ? [value] : [])
                }  >
                <GridColumn path="name" />
                <GridColumn path="birthDate" />
            </Grid>}

            {
                isNewPet && <PetForm {...owner} />
            }
        </div>
    )
}