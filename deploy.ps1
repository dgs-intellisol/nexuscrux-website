# PowerShell deployment script for Hostinger
# This script builds the project and prepares it for upload

Write-Host "🚀 Nexus Crux marketing website for production..." -ForegroundColor Cyan

# Build the project
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Copy .htaccess to build folder (if not already copied by vite plugin)
if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" -Destination "build\.htaccess" -Force
    Write-Host "✓ .htaccess copied to build folder" -ForegroundColor Green
}

# Copy favicon files if they exist in public folder (check both public/ and src/public/)
$faviconFiles = @('favicon.ico', 'favicon.svg', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png')
$faviconsCopied = 0

foreach ($file in $faviconFiles) {
    $srcPath1 = "public\$file"
    $srcPath2 = "src\public\$file"
    $destPath = "build\$file"
    
    if (Test-Path $srcPath1) {
        Copy-Item $srcPath1 -Destination $destPath -Force
        $faviconsCopied++
    } elseif (Test-Path $srcPath2) {
        Copy-Item $srcPath2 -Destination $destPath -Force
        $faviconsCopied++
    }
}

if ($faviconsCopied -gt 0) {
    Write-Host "✓ $faviconsCopied favicon file(s) copied to build folder" -ForegroundColor Green
} else {
    Write-Host "ℹ No favicon files found in public folder (using logo SVG as favicon)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Build files are ready in the 'build' folder" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Upload all files from the 'build' folder to your Hostinger public_html directory"
Write-Host "2. Make sure .htaccess is included in the upload"
Write-Host "3. Test your site at https://nexuscrux.io"
Write-Host ""
Write-Host "See DEPLOYMENT.md for detailed instructions" -ForegroundColor Gray

