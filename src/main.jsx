import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { StoreProvider } from './store.jsx';
import './styles.css';
import { initTheme } from './theme.js';

initTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HashRouter>
  </React.StrictMode>
);

// Fade out the splash screen once the app has mounted (kept visible briefly so it never flickers).
const splash = document.getElementById('splash');
if (splash) {
  const shownFor = performance.now();
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 500);
  }, Math.max(0, 1100 - shownFor));
}
