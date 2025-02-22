import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ArweaveWalletKit } from '@arweave-wallet-kit/react'
import WanderStrategy from '@arweave-wallet-kit/wander-strategy'
import BrowserWalletStrategy from '@arweave-wallet-kit/browser-wallet-strategy'
import WebWalletStrategy from '@arweave-wallet-kit/webwallet-strategy'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ArweaveWalletKit
        config={{
          permissions: [
            'ACCESS_ADDRESS',
            'ACCESS_PUBLIC_KEY',
            'SIGN_TRANSACTION',
            'DISPATCH',
          ],
          ensurePermissions: true,
          strategies: [
            new WanderStrategy(),
            new BrowserWalletStrategy(),
            new WebWalletStrategy(),
          ],
        }}
      >
        <App />
      </ArweaveWalletKit>
    </HashRouter>
  </StrictMode>,
)
