import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { OwnerEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import OwnerForm from "./OwnerForm";
import { Button } from "@hilla/react-components/Button.js";
import OwnerInformationForm from "./OwnerInformationForm";

export default function OwnerView() {
    const [owners, setOwners] = useState([]);
    const [isAddNewOwner, setIsAddNewOwner] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null as any);
    const fetchData = async () => {
        const data: any = await OwnerEndpoint.getOwners();
        setOwners(data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            {!isAddNewOwner && !selectedItems &&
                <>
                    <Button className="mb-1" theme="primary" onClick={() => setIsAddNewOwner(true)}
                    >Add New Owner</Button>
                    <Grid
                        items={owners}

                        onActiveItemChanged={({ detail: { value } }) =>
                            setSelectedItems(value ? [value] : [])
                        }  >

                        <GridColumn header="#">
                            {({ item }) => <span>{item.id}</span>}
                        </GridColumn>
                        <GridColumn header="Name" >
                            {({ item }) => <span>{item.firstName + ' ' + item.lastName}</span>}
                        </GridColumn>
                        <GridColumn path="email" />
                        <GridColumn path="address" />
                        <GridColumn path="telephone" />
                    </Grid>
                </>
            }
            {isAddNewOwner &&
                <OwnerForm />
            }
            {selectedItems && !isAddNewOwner &&
                <OwnerInformationForm owner={{ selectedItems }} />
            }
        </>

    );
}