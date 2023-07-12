import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { VetEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";

export default function VetView() {
    const [owners, setVets] = useState([]);
    let selectedCompany;
    const setSelectedItems = (event: any) => {
        console.log(event)
    }
    const fetchData = async () => {
        const data: any = await VetEndpoint.getAllVets();
        setVets(data);
    }
    useEffect(() => {
        fetchData()

    }, [])
    return (
        <div className={'container mt-2'}>
            <h2 >Vet</h2>
            <Grid
                items={owners}
                selectedItems={selectedCompany}
                onActiveItemChanged={({ detail: { value } }) =>
                    setSelectedItems(value ? [value] : [])
                }
            >
                <GridColumn header="#">
                    {({ item }) => <span>{item.id}</span>}
                </GridColumn>
                <GridColumn path="firstName" />
              
                <GridColumn path="lastName" />
                <GridColumn path="email" />
            </Grid>
        </div>
    );
}