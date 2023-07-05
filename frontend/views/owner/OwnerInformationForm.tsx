import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import { useEffect, useState } from "react";
import OwnerForm from "./OwnerForm";

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
            <h2 className="mb-1">Owner Information</h2>
            {!isEditOwner &&
                <>
                    <Grid
                        items={owner} >
                        <GridColumn header="Name" >
                            {({ item }) => <span>{item.firstName + ' ' + item.lastName}</span>}
                        </GridColumn>
                        <GridColumn path="email" />
                        <GridColumn path="address" />
                        <GridColumn path="telephone" />
                    </Grid>

                    <div className="mt-1">
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

            <h2 className="mt-1">Pets</h2>

            {owner.length > 0 && <Grid
                items={owner[0].pets}
                onActiveItemChanged={({ detail: { value } }) =>
                    setSelectedItems(value ? [value] : [])
                }  >
                <GridColumn path="name" />
                <GridColumn path="birthDate" />
            </Grid>}
        </div>
    )
}