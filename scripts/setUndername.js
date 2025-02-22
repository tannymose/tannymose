import fs from 'fs';
import { ANT, ArweaveSigner } from '@ar.io/sdk';

async function setUndername() {
    try {
        // Check for wallet.json
        if (!fs.existsSync('./wallet.json')) {
            throw new Error('wallet.json not found in the root of your project');
        }
        
        // Check for manifest.json
        if (!fs.existsSync('./manifest.json')) {
            throw new Error('manifest.json not found. Please run `pnpm deploy` first');
        }

        const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf8'));
        const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
        
        if (!manifest.id) {
            throw new Error('No manifest ID found in manifest.json. Please deploy your site first');
        }

        console.log(`Using manifest ID: ${manifest.id}`);

        const ant = ANT.init({
            signer: new ArweaveSigner(jwk),
            processId: 'YOUR_PROCESS_ID_HERE'
        });

        const { id: txId } = await ant.setUndernameRecord({
            undername: 'dapp', // You might want to make this configurable
            transactionId: manifest.id,
            ttlSeconds: 900 // 15 minutes
        });

        console.log('\nUndername Record Update Complete! 🎉');
        console.log(`Transaction ID: ${txId}`);
        console.log(`View your deployment at: https://dapp_YOUR_NAME.ar.io\n`);
    } catch (error) {
        console.error('Failed to update undername record:', error);
        process.exit(1);
    }
}

setUndername();
