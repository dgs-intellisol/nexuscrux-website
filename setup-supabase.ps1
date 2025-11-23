# Supabase Setup Helper Script
# This script guides you through Supabase setup

Write-Host "`n🚀 Supabase Setup Helper`n" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Step 1: Check CLI
Write-Host "`n📦 Step 1: Checking Supabase CLI...`n" -ForegroundColor Yellow
$cliVersion = npx --yes supabase@latest --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Supabase CLI is ready (via npx)" -ForegroundColor Green
    Write-Host "   Version: $cliVersion" -ForegroundColor Gray
} else {
    Write-Host "❌ CLI check failed" -ForegroundColor Red
    exit 1
}

# Step 2: Instructions for getting token
Write-Host "`n🔑 Step 2: Get Supabase Access Token`n" -ForegroundColor Yellow
Write-Host "Please follow these steps:" -ForegroundColor White
Write-Host "1. Go to: https://supabase.com/dashboard" -ForegroundColor Cyan
Write-Host "2. Sign up or log in" -ForegroundColor Cyan
Write-Host "3. Click your profile (top right) → Account Settings" -ForegroundColor Cyan
Write-Host "4. Go to: Access Tokens tab" -ForegroundColor Cyan
Write-Host "5. Click: Generate New Token" -ForegroundColor Cyan
Write-Host "6. Name it: nexuscrux-cli" -ForegroundColor Cyan
Write-Host "7. Copy the token`n" -ForegroundColor Cyan

$token = Read-Host "Paste your access token here (or press Enter to skip this step)"

if ($token) {
    Write-Host "`n🔐 Step 3: Logging in...`n" -ForegroundColor Yellow
    echo $token | npx supabase@latest login
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Login successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Login failed. Please try again." -ForegroundColor Red
    }
} else {
    Write-Host "⏭️  Skipping login. Run this manually:" -ForegroundColor Yellow
    Write-Host "   npx supabase@latest login" -ForegroundColor Cyan
}

# Step 4: Link project
Write-Host "`n🔗 Step 4: Linking project...`n" -ForegroundColor Yellow
$linkProject = Read-Host "Link project dvvycujiegrhphdtdqeb? (Y/n)"
if ($linkProject -eq "" -or $linkProject -eq "Y" -or $linkProject -eq "y") {
    npx supabase@latest link --project-ref dvvycujiegrhphdtdqeb
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Project linked!" -ForegroundColor Green
    } else {
        Write-Host "❌ Link failed. Make sure you're logged in first." -ForegroundColor Red
    }
}

# Step 5: Instructions for credentials
Write-Host "`n📋 Step 5: Get Your Credentials`n" -ForegroundColor Yellow
Write-Host "Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/api" -ForegroundColor Cyan
Write-Host "Copy the service_role key (keep it secret!)`n" -ForegroundColor Cyan

# Step 6: Create .env file
Write-Host "`n📄 Step 6: Creating .env file...`n" -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    $envContent = @"
# Supabase Configuration
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU

# Stripe Configuration (add your keys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_KEY
"@
    $envContent | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ .env file created!" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file already exists" -ForegroundColor Yellow
}

# Step 7: Instructions for secrets
Write-Host "`n🔒 Step 7: Set Secrets in Dashboard`n" -ForegroundColor Yellow
Write-Host "Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions" -ForegroundColor Cyan
Write-Host "Scroll to: Secrets section" -ForegroundColor Cyan
Write-Host "Add these secrets:" -ForegroundColor Cyan
Write-Host "  - STRIPE_SECRET_KEY" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_STARTER_MONTHLY" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_STARTER_ANNUAL" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_GROWTH_MONTHLY" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_GROWTH_ANNUAL" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_SCALE_MONTHLY" -ForegroundColor White
Write-Host "  - STRIPE_PRICE_SCALE_ANNUAL`n" -ForegroundColor White

# Step 8: Deploy functions
Write-Host "`n🚀 Step 8: Deploy Functions`n" -ForegroundColor Yellow
$deploy = Read-Host "Deploy Edge Functions now? (Y/n)"
if ($deploy -eq "" -or $deploy -eq "Y" -or $deploy -eq "y") {
    Write-Host "Deploying functions..." -ForegroundColor Cyan
    npx supabase@latest functions deploy server
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Functions deployed!" -ForegroundColor Green
    } else {
        Write-Host "❌ Deployment failed. Check errors above." -ForegroundColor Red
    }
}

# Step 9: Test
Write-Host "`n✅ Step 9: Test Deployment`n" -ForegroundColor Yellow
Write-Host "Testing health endpoint..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Health check passed!" -ForegroundColor Green
        Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Health check failed. Function may not be deployed yet." -ForegroundColor Yellow
}

Write-Host "`n🎉 Setup Complete!`n" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Configure Stripe (get API keys)" -ForegroundColor White
Write-Host "2. Set Stripe secrets in Supabase Dashboard" -ForegroundColor White
Write-Host "3. Test the payment flow" -ForegroundColor White

