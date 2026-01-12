import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import Spinner from './components/global/spinner/index.jsx';
import  PannelContextProvider   from './context/PannelContext.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie'; 
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
  
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PannelContextProvider>
            <Suspense fallback={<Spinner />}>
              <>
                <App />
                <ToastContainer
                  style={{ fontSize: 15 }}
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar
                  closeOnClick
                  pauseOnHover
                />
              </>
            </Suspense>
          </PannelContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
