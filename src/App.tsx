import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/home';
import Resume from './pages/resume';

export default function App() {
  return (
    <Router>
      <Home path="/" />
      <Resume path="/resume" />
    </Router>
  );
}
