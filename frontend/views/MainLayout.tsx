import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from "@hilla/react-components/Icon.js";
import { Tab } from "@hilla/react-components/Tab.js";
import { Tabs } from "@hilla/react-components/Tabs.js";
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import { MenuProps, routes, ViewRouteObject } from 'Frontend/routes.js';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

type MenuRoute = ViewRouteObject &
    Readonly<{
        path: string;
        handle: Required<MenuProps>;
    }>;

export default function MenuOnLeftLayout() {
    const menuRoutes = (routes[0]?.children || []) as readonly MenuRoute[];

    return (
        <AppLayout>
            <HorizontalLayout theme='spacing' slot="navbar" style={{marginLeft: '10rem'}}>
                <img src="../components/images/hilla-logo.png" alt="" width="25px" />
                Hilla Pet Clinic
            </HorizontalLayout>

            <Tabs slot="navbar" orientation="horizontal">
                {menuRoutes.map(({ path, handle: { icon, title, isNotDisplayOnNavBar } }) => (
                    !isNotDisplayOnNavBar && <>
                        < Tab key={path} >
                            <NavLink className={({ isActive }) => `${isActive ? 'bg-contrast-10' : ''}`}
                                key={path} to={path}>
                                <Icon icon={icon} className='--lumo-icon-size-s' />  {title}
                            </NavLink>
                        </Tab>
                    </>
                ))}
            </Tabs>

            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}