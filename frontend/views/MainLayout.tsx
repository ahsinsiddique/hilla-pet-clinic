import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import {Item} from '@hilla/react-components/Item.js';
import {Scroller} from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {MenuProps, routes, useViewMatches, ViewRouteObject} from 'Frontend/routes.js';
import {Suspense} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import css from './MainLayout.module.css';
import {Tab} from "@hilla/react-components/Tab.js";
import {Tabs} from "@hilla/react-components/Tabs.js";

type MenuRoute = ViewRouteObject &
    Readonly<{
        path: string;
        handle: Required<MenuProps>;
    }>;

export default function MenuOnLeftLayout() {
    const matches = useViewMatches();
    const menuRoutes = (routes[0]?.children || []).filter(
        (route) => route.path && route.handle && route.handle.icon && route.handle.title
    ) as readonly MenuRoute[];

    return (
        <AppLayout>
           
            <h3 style={{marginLeft: "10rem"}} slot="navbar">
            <img src="../themes/hilla-logo.png" alt="" style={{width: "25px", paddingRight: "1rem"}} />Hilla Pet Clinic</h3>
            <Tabs slot="navbar" orientation="horizontal">
                {menuRoutes.map(({path, handle: {icon, title}}) => (
                    <Tab key={path}>
                        <NavLink
                            className={({ isActive }) => `${css.navlink} ${isActive ? css.navlink_active : ''}`}
                            key={path}
                            to={path}
                        >
                         <span
                      className={css.navicon}
                      style={
                          {
                              '--mask-image': `url('line-awesome/svg/${icon}.svg')`,
                              maskImage: 'var(--mask-image)',
                              WebkitMaskImage: 'var(--mask-image)',
                          } as any
                      }
                      aria-hidden="true"
                  ></span>{title}
                        </NavLink>
                    </Tab>
                ))}
            </Tabs>
           
            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}