# PowerShell deployment script for Hostinger
# This script builds the project and prepares it for upload

Write-Host "🚀 Building Nexus Crux website for production..." -ForegroundColor Cyan

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

