import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {QueryClient, QueryClientProvider } from 'react-query';
import UserCotextProvider from './components/Context/UserContext';
import {ReactQueryDevtools}from 'react-query/devtools'
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient=new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}> 
  <UserCotextProvider>
     <App />
  </UserCotextProvider>
  <ReactQueryDevtools initialIsOpen="false" position='bottom-right'/> 
  </QueryClientProvider>
  
);

 