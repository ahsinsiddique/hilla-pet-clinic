import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { CompanyReactEndpoint, OwnerEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import OwnerForm from "./OwnerForm";
import { Button } from "@hilla/react-components/Button.js";

export default function OwnerView() {
    const [owners, setOwners] = useState([]);
    const [isAddNewOwner, setIsAddNewOwner] = useState(false);
    let selectedItems;
    const setSelectedItems = (event: any) => {
        console.log(event)
    }
    const fetchData = async () => {
        const data: any = await OwnerEndpoint.getOwners();
        setOwners(data);
    }
    useEffect(() => {
        fetchData()

    }, [])
    return (

        <>
            {!isAddNewOwner &&
                <>
                    <Button theme="primary" onClick={() => setIsAddNewOwner(true)}
                    >Add New Owner</Button>
                    <Grid
                        items={owners}
                        selectedItems={selectedItems}
                        onActiveItemChanged={({ detail: { value } }) =>
                            setSelectedItems(value ? [value] : [])
                        }  >

                        <GridColumn header="#">
                            {({ item }) => <span>{item.id}</span>}
                        </GridColumn>
                        <GridColumn path="firstName" />
                        <GridColumn path="lastName" />
                        <GridColumn path="email" />
                        <GridColumn path="address" />
                        <GridColumn path="telephone" />
                    </Grid>
                </>
            }
            {isAddNewOwner &&
                <OwnerForm />
            }


        </>

    );
}