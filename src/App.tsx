import React from 'react';
import { JewelryProvider } from './context/JewelryContext';
import { Header } from './components/Header';
import { ShreeHariBanner } from './components/brand/ShreeHariBanner';
import { CategoryNav } from './components/CategoryNav';
import { FilterBar } from './components/FilterBar';
import { DesignGallery } from './components/DesignGallery';
import { UploadModal } from './components/UploadModal';
import { DesignDetailModal } from './components/DesignDetailModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FilterDrawer } from './components/FilterDrawer';
import { SettingsModal } from './components/SettingsModal';
import { EditDesignModal } from './components/EditDesignModal';
import { ShowroomHoursModal } from './components/ShowroomHoursModal';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F7F2] dark:bg-[#12100E] text-[#3D3732] dark:text-[#E8E2D9] flex flex-col font-sans selection:bg-[#C5A059]/20 transition-colors duration-300">
      {/* Sticky Header */}
      <Header />

      {/* Hero Showcase Banner */}
      <ShreeHariBanner />

      {/* Sticky Category Bar */}
      <CategoryNav />

      {/* Filter and Sort Toolbar */}
      <FilterBar />

      {/* Main Designs Showcase Gallery */}
      <main className="flex-1">
        <DesignGallery />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <UploadModal />
      <EditDesignModal />
      <DesignDetailModal />
      <FavoritesDrawer />
      <FilterDrawer />
      <SettingsModal />
      <ShowroomHoursModal />
    </div>
  );
};

export default function App() {
  return (
    <JewelryProvider>
      <AppContent />
    </JewelryProvider>
  );
}

