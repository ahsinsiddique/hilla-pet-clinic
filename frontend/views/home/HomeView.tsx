
import OwnerView from "Frontend/views/owner/OwnerView";
import './../../themes/hilla-pet-clinic/styles.css';
export default function HomeView() {
    return (
        <div className={'container'}>
            <img src="../../components/images/pets.png" alt="/" className='pet-logo' />
            <OwnerView />
        </div>
    );
}
