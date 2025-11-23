
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { copyFileSync, existsSync, mkdirSync } from 'fs';

  export default defineConfig({
    plugins: [
      react(),
      // Plugin to copy logos folder and other assets to build folder
      {
        name: 'copy-build-assets',
        closeBundle() {
          try {
            // Copy .htaccess
            if (existsSync(path.resolve(__dirname, '.htaccess'))) {
              copyFileSync(
                path.resolve(__dirname, '.htaccess'),
                path.resolve(__dirname, 'build/.htaccess')
              );
              console.log('✓ .htaccess copied to build folder');
            }

            // Copy logos folder
            const logosSrc = path.resolve(__dirname, 'src/public/logos');
            const logosDest = path.resolve(__dirname, 'build/logos');
            
            if (existsSync(logosSrc)) {
              // Create logos directory in build
              if (!existsSync(logosDest)) {
                mkdirSync(logosDest, { recursive: true });
              }

              // Copy all SVG files from logos folder
              const fs = require('fs');
              const files = fs.readdirSync(logosSrc);
              let copied = 0;
              
              files.forEach((file: string) => {
                if (file.endsWith('.svg')) {
                  const srcFile = path.join(logosSrc, file);
                  const destFile = path.join(logosDest, file);
                  copyFileSync(srcFile, destFile);
                  copied++;
                }
              });

              if (copied > 0) {
                console.log(`✓ ${copied} logo file(s) copied to build/logos/`);
              }
            }

            // Copy favicon.svg if it exists
            const faviconSrc = path.resolve(__dirname, 'src/public/favicon.svg');
            const faviconDest = path.resolve(__dirname, 'build/favicon.svg');
            if (existsSync(faviconSrc)) {
              copyFileSync(faviconSrc, faviconDest);
              console.log('✓ favicon.svg copied to build folder');
            }
          } catch (error) {
            console.warn('⚠ Could not copy build assets:', error);
          }
        },
      },
    ],
    publicDir: 'src/public', // Vite will copy files from src/public to build root
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'stripe@14.10.0': 'stripe',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@supabase/supabase-js@2': '@supabase/supabase-js',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@jsr/supabase__supabase-js@2': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });