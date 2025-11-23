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

# Copy favicon files if they exist in public folder (check both public/ and src/public/)
FAVICON_FILES=("favicon.ico" "favicon.svg" "favicon-16x16.png" "favicon-32x32.png" "apple-touch-icon.png" "icon-192.png" "icon-512.png")
FAVICONS_COPIED=0

for file in "${FAVICON_FILES[@]}"; do
    if [ -f "public/$file" ]; then
        cp "public/$file" "build/$file"
        FAVICONS_COPIED=$((FAVICONS_COPIED + 1))
    elif [ -f "src/public/$file" ]; then
        cp "src/public/$file" "build/$file"
        FAVICONS_COPIED=$((FAVICONS_COPIED + 1))
    fi
done

if [ $FAVICONS_COPIED -gt 0 ]; then
    echo "✓ $FAVICONS_COPIED favicon file(s) copied to build folder"
else
    echo "ℹ No favicon files found in public folder (using logo SVG as favicon)"
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

