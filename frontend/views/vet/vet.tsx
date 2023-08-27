import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
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
        <VerticalLayout theme="spacing"  style={{padding: 'var(--lumo-size-l)'}}>
            <h2 >Vet</h2>
            <Grid theme="spacing"
                items={owners}
                selectedItems={selectedCompany}
                onActiveItemChanged={({ detail: { value } }) =>
                    setSelectedItems(value ? [value] : [])
                }
            >
                <GridColumn path="firstName" />
              
                <GridColumn path="lastName" />
                <GridColumn path="email" />
            </Grid>
        </VerticalLayout>
    );
}