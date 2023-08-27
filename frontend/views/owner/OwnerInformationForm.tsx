import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import Pet from "Frontend/generated/com/petclinic/application/data/entity/owner/Pet";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OwnerInformationForm() {
    const [owner, setOwner] = useState({} as Owner);
    const { ownerId } = useParams();
    const navigate = useNavigate();
    const setSelectedItems = (pet: Pet[]) => {
        navigate(`/pet/${pet[0].id}`, { state: owner });
        setOwner(owner);
    }

    const fetchData = async () => {
        const data: any = await OwnerEndpoint.findOwner(Number(ownerId));
        setOwner(data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="container">
            <h2>Owner Information</h2>
            {owner && owner.id &&
                <>
                    <HorizontalLayout  className="align-center" theme="spacing">
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
                </>}

            <HorizontalLayout theme="margin" className="align-center">
                <Button theme="primary" onClick={() => navigate(`/owner/${owner.id}`, { state: owner })}>Update Owner
                </Button>
                <Button theme="primary" style={{ marginLeft: '1rem' }}
                    onClick={() => { navigate('/pet/new', { state: owner }) }}>Add New Pet
                </Button>
                {owner.id && owner.pets && owner.pets.length > 0 &&
                    <Button theme="secondary"
                        style={{ marginLeft: '1rem' }}
                        onClick={() => navigate(`/owner/${owner.id}/pets-visit-details`)}>Pets Visit Details
                    </Button>}
            </HorizontalLayout>

            {owner.id &&
                <>
                    <h2>Pets</h2>
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
        </div>
    )
}