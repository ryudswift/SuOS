import React from 'react';
import Dashboard from './components/Dashboard';
import { mockLeads } from './data/mockData';

function App() {
  return (
    <div className="App">
      <Dashboard leads={mockLeads} />
    </div>
  );
}

export default App;