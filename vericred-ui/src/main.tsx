import './globals';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { setNetworkId, NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import App from './App';
import '@midnight-ntwrk/dapp-connector-api';
import * as pino from 'pino';

const networkId = (import.meta.env.VITE_NETWORK_ID || 'preprod') as NetworkId;
setNetworkId(networkId);

export const logger = pino.pino({
  level: (import.meta.env.VITE_LOGGING_LEVEL || 'info') as string,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
