import {CompanyReactEndpoint} from "Frontend/generated/endpoints";
import {useEffect, useState} from "react";
import OwnerView from "Frontend/views/owner/Owner";
import './../../themes/hilla-pet-clinic/styles.css';
import OwnerCrud from "../owner/OwnerCRUD";
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
        
     <div className={'container'}>
         <img src="./../../themes/pets.png" alt="/" className='pet-logo' />

         <OwnerCrud/>
         <OwnerView/>
     </div>
    );
}
