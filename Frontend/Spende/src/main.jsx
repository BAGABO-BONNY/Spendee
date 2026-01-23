import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import logo from './assets/logo (2).png'

const setFavicon = (url) => {
  const sizes = ['32x32', '16x16', '192x192', '512x512'];
  const rels = ['icon', 'apple-touch-icon'];
  
  sizes.forEach(size => {
    let link = document.querySelector(`link[rel='icon'][sizes='${size}']`);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.sizes = size;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
  });
  
  let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
  if (!appleIcon) {
    appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.sizes = '180x180';
    document.getElementsByTagName('head')[0].appendChild(appleIcon);
  }
  appleIcon.href = url;
};

setFavicon(logo);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster position="top-right" />
    </UserProvider>
  </StrictMode>,
)
