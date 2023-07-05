
import OwnerView from "Frontend/views/owner/Owner";
import './../../themes/hilla-pet-clinic/styles.css';
export default function HomeView() {
    return (
        <div className={'container'}>
            <img src="./../../themes/pets.png" alt="/" className='pet-logo' />
            <OwnerView />
        </div>
    );
}
