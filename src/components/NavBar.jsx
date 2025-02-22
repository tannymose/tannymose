import { ConnectButton, useConnection, useActiveAddress } from '@arweave-wallet-kit/react';
import { ARIO } from '@ar.io/sdk';
import { useState, useEffect } from 'react';

function NavBar() {
  const { connected, disconnect } = useConnection();
  const address = useActiveAddress();
  const [primaryName, setPrimaryName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    async function fetchPrimaryName() {
      if (connected && address) {
        setLoading(true);
        setCountdown(3);
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        try {
          const ario = ARIO.init();
          const response = await ario.getPrimaryName({
            address: address
          });
          setPrimaryName(response?.name || null);
        } catch (error) {
          console.error('Failed to fetch primary name:', error);
          setPrimaryName(null);
        } finally {
          clearInterval(timer);
          setLoading(false);
        }
      } else {
        setPrimaryName(null);
        setLoading(false);
      }
    }

    fetchPrimaryName();
  }, [connected, address]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              AR.IO Starter Kit
            </a>
          </div>

          {/* Center Navigation Links and Primary Name */}
          <div className="flex-1 flex justify-center items-center space-x-4">
            {connected && (
              <>
                <span className="text-gray-600 font-medium">
                  Active Page: <span className="text-gray-900 font-bold">Dashboard</span>
                </span>
                {loading ? (
                  <span className="text-gray-500 font-medium animate-pulse">
                    Loading primary name... {countdown}s
                  </span>
                ) : primaryName ? (
                  <span className="text-gray-600 font-medium">
                    Primary Name: <span className="text-gray-900 font-bold">{primaryName}</span>
                  </span>
                ) : (
                  <a 
                    href="https://arns.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Set Primary Name
                  </a>
                )}
              </>
            )}
          </div>

          {/* Wallet Connect Button and Disconnect - Right Aligned */}
          <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
            <ConnectButton 
              showBalance={true}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            />
            {connected && (
              <button
                onClick={disconnect}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
