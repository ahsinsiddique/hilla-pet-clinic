
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import {CompanyReactEndpoint, OwnerEndpoint, VetEndpoint} from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";

export default function VetView() {
    const [owners, setOwners] = useState([]);
    let selectedCompany;
    const setSelectedCompanise = (event: any) => {
      console.log(event)
    }
    const fetchData = async () => {
      const data: any = await VetEndpoint.getOwners();
       // const data2: any = await VetEndpoint.();

        console.log(data)

      setOwners(data);
    }
    useEffect(() => {
      fetchData()
  
    }, [])
    return (
      <Grid
        items={owners}
        selectedItems={selectedCompany}
        onActiveItemChanged={({ detail: { value } }) =>
          setSelectedCompanise(value ? [value] : [])
        }
      >
        <GridColumn path="version" />
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" />
        
      </Grid>
    );
}