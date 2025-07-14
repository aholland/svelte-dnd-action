import { copyFileSync, mkdirSync } from 'fs';

// Ensure dist directory exists
mkdirSync('./dist', { recursive: true });

// Copy TypeScript definitions
copyFileSync('./typings/index.d.ts', './dist/index.d.ts');

// eslint-disable-next-line no-console
console.log('TypeScript definitions copied to dist/');