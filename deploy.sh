#!/bin/bash
# Bash deployment script for Hostinger
# This script builds the project and prepares it for upload

echo "🚀 Building Nexus Crux website for production..."

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Copy .htaccess to build folder (if not already copied by vite plugin)
if [ -f ".htaccess" ]; then
    cp .htaccess build/.htaccess
    echo "✓ .htaccess copied to build folder"
fi

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📦 Build files are ready in the 'build' folder"
echo ""
echo "Next steps:"
echo "1. Upload all files from the 'build' folder to your Hostinger public_html directory"
echo "2. Make sure .htaccess is included in the upload"
echo "3. Test your site at https://nexuscrux.io"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"

