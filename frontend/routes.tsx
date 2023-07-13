import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, IndexRouteObject, NonIndexRouteObject, useMatches } from 'react-router-dom';
import OwnerView from './views/owner/Owner';
import VetView from "Frontend/views/vet/vet";
import HomeView from "Frontend/views/home/HomeView";
import PetVisit from './views/pet/PetVisit';

const AboutView = lazy(async () => import('Frontend/views/home/HomeView.js'));
export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
  isNotDisplayOnNavBar?: boolean;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    handle: { icon: 'null', title: 'Main' },
    children: [
      { path: '/', element: <HomeView />, handle: { icon: 'globe-solid', title: 'Home',  } },
      { path: '/vets', element: <VetView />, handle: { icon: 'user', title: 'Vets' } },
      { path: '/owner', element: <OwnerView />, handle: { icon: 'user', title: 'Owner', } },
      { path: '/owner/:ownerId/pets-visit-details', element: <PetVisit />, handle: { icon: 'star', title: 'Pet Visit', isNotDisplayOnNavBar: true } },
    ],
  },
];

export const routes_: readonly ViewRouteObject[] = [
  {
    element: <MainLayout />,
    handle: { icon: 'null', title: 'Main' },
    children: [
      { path: '/pet-visit', element: <PetVisit />, handle: { icon: 'globe-solid', title: 'Pet Visit' } },
    ],
  },
];

const router = createBrowserRouter([...routes, ...routes_]);
export default router;
