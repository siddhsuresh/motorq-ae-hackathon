import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';
import { Suspense } from 'react';

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <div className="bg-gray-900 h-screen overflow-hidden relative">
        <div className="flex items-start">
          <Overlay />
          <Suspense fallback={null}>
            <SideNavigation mobilePosition="right" />
          </Suspense>
          <div className="flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4">
            <Suspense fallback={null}>
              <TopNavigation />
            </Suspense>
            <main className="h-full overflow-auto pb-36 pt-10 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4">{children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
