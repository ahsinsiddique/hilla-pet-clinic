import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <VerticalLayout theme='margin spacing' className='container'>
            <h2>404 Error</h2>
            <h3>Page Not Found</h3>
            <p>This page was not found. It might have moved, or it no longer exists.</p>
          <span>you can go to the <Link to={'/'}> start page.</Link></span>  
        </VerticalLayout>
    )
};
