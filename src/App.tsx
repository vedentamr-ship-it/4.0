import { useState } from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Entities } from './components/Entities';
import { EntityProfile } from './components/EntityProfile';
import { Activities } from './components/Activities';
import { Alerts } from './components/Alerts';
import { CampusMap } from './components/CampusMap';
import { Analytics } from './components/Analytics';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleViewProfile = (entityId: string) => {
    setSelectedEntityId(entityId);
  };

  const handleCloseProfile = () => {
    setSelectedEntityId(null);
  };

  const renderContent = () => {
    if (selectedEntityId) {
      return <EntityProfile entityId={selectedEntityId} onClose={handleCloseProfile} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'entities':
        return <Entities onViewProfile={handleViewProfile} />;
      case 'activities':
        return <Activities />;
      case 'alerts':
        return <Alerts onViewProfile={handleViewProfile} />;
      case 'map':
        return <CampusMap />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="ml-64">
        {renderContent()}
      </main>
    </Layout>
  );
}

export default App;
