import { Button } from "@hilla/react-components/Button.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import Owner from "Frontend/generated/com/petclinic/application/data/entity/owner/Owner";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerView() {
    const [owners, setOwners] = useState([] as Array<Owner>);
    const navigate = useNavigate();

    const fetchData = async () => {
        const ownersApiData: Array<Owner> = await OwnerEndpoint.getOwners() as Array<Owner>;
        setOwners(ownersApiData);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const setSelectedOwner = (owners: Owner[]) => {
        navigate(`/owner/details/${owners[0].id}`, { state: owners });
    }

    return (
        <div className="container">
            <Button theme="primary" onClick={() => navigate('/owner/new')}
            >Add New Owner</Button>
            <Grid
                items={owners}
                onActiveItemChanged={({ detail: { value } }) =>
                    setSelectedOwner(value ? [value] : [])
                }  >
                <GridColumn header="Name" >
                    {({ item }) => <span className="color-link">{item.firstName + ' ' + item.lastName}</span>}
                </GridColumn>
                <GridColumn path="email" />
                <GridColumn path="address" />
                <GridColumn path="telephone" />
            </Grid>
        </div>
    );
}