import { CompanyReactEndpoint } from "Frontend/generated/endpoints";
import { useEffect, useState } from "react";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
export default function AboutView() {
  const [companies, setCompanies] = useState([]);
  let selectedCompany;
  const setSelectedCompanise = (event: any) => {
    console.log(event)
  }
  const fetchData = async () => {
    const data: any = await CompanyReactEndpoint.getCompanies();
    console.log(data)

    setCompanies(data);
  }
  useEffect(() => {
    fetchData()

  }, [])
  return (
    <Grid
      items={companies}
      selectedItems={selectedCompany}
      onActiveItemChanged={({ detail: { value } }) =>
        setSelectedCompanise(value ? [value] : [])
      }
    >
      <GridColumn path="version" />
      <GridColumn path="name" />
      <GridColumn path="" />
      <GridColumn header="# Of items">
        {({ item }) => <span>{item && item.employees.length.toString()}</span>}
      </GridColumn>
    </Grid>
  );
}
