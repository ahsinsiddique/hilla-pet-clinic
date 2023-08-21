import { AppLayout } from '@hilla/react-components/AppLayout.js';
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

            <h3 style={{ marginLeft: "10rem" }} slot="navbar">
                <img src="../themes/hilla-logo.png" alt="" style={{ width: "25px", paddingRight: "1rem" }} />
                Hilla Pet Clinic
            </h3>

            <Tabs slot="navbar" orientation="horizontal">
                {menuRoutes.map(({ path, handle: { icon, title, isNotDisplayOnNavBar } }) => (
                    < Tab key={path} > {!isNotDisplayOnNavBar &&
                        <NavLink className={({ isActive }) => `${isActive ? 'bg-contrast-10' : ''}`}
                            key={path} to={path}>
                            <Icon icon={icon} />  {title}
                        </NavLink>}
                    </Tab>
                ))}
            </Tabs>

            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}