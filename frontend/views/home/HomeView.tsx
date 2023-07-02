import {CompanyReactEndpoint} from "Frontend/generated/endpoints";
import {useEffect, useState} from "react";
import OwnerView from "Frontend/views/owner/Owner";

export default function HomeView() {
    const [companies, setCompanies] = useState([]);
    const fetchData = async () => {
        const data: any = await CompanyReactEndpoint.getCompanies();
        setCompanies(data);
    }
    useEffect(() => {
        fetchData()

    }, [])
    return (
      <OwnerView/>
    );
}
