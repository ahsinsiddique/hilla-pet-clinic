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
            <DrawerToggle slot="navbar"></DrawerToggle>
            <h3 slot="navbar">Hilla Pet Clinic</h3>
            <header slot="drawer">
                <h1 className="text-l m-0">Hilla Pet Clinic</h1>
            </header>
            <Tabs slot="navbar" orientation="horizontal">

                {menuRoutes.map(({path, handle: {icon, title}}) => (
                    <Tab>
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
            <Scroller slot="drawer" scroll-direction="vertical">
                <nav>
                    {menuRoutes.map(({ path, handle: { icon, title } }) => (
                        <NavLink
                            className={({ isActive }) => `${css.navlink} ${isActive ? css.navlink_active : ''}`}
                            key={path}
                            to={path}
                        >
                            {({ isActive }) => (
                                <Item key={path} selected={isActive}>
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
                  ></span>
                                    {title}
                                </Item>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </Scroller>
            <footer slot="drawer" />

            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}


export function Test() {
    const matches = useViewMatches();

    const currentTitle = matches[matches.length - 1]?.handle?.title ?? 'Unknown';

    const menuRoutes = (routes[0]?.children || []).filter(
        (route) => route.path && route.handle && route.handle.icon && route.handle.title
    ) as readonly MenuRoute[];
    return (
        <AppLayout className="block h-full" primarySection="drawer">
            <header slot="drawer">
                <h1 className="text-l m-0">Hilla Pet Clinic</h1>
            </header>
            <Scroller slot="drawer" scroll-direction="vertical">
                <nav>
                    {menuRoutes.map(({ path, handle: { icon, title } }) => (
                        <NavLink
                            className={({ isActive }) => `${css.navlink} ${isActive ? css.navlink_active : ''}`}
                            key={path}
                            to={path}
                        >
                            {({ isActive }) => (
                                <Item key={path} selected={isActive}>
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
                  ></span>
                                    {title}
                                </Item>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </Scroller>
            <footer slot="drawer" />

            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h2 slot="navbar" className="text-l m-0">
                {currentTitle}
            </h2>

            <Suspense fallback={<Placeholder />}>
                <Outlet />
            </Suspense>
        </AppLayout>

    )
}