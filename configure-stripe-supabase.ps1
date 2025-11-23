# Stripe + Supabase Configuration Helper
# This script helps configure both services

Write-Host "`n🚀 Stripe + Supabase Configuration Helper`n" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Step 1: Get Stripe Keys
Write-Host "`n💳 Step 1: Stripe Configuration`n" -ForegroundColor Yellow

$stripePublishableKey = Read-Host "Enter your Stripe Publishable Key (pk_test_...)"
$stripeSecretKey = Read-Host "Enter your Stripe Secret Key (sk_test_...)"

# Step 2: Update .env file
Write-Host "`n📄 Step 2: Updating .env file...`n" -ForegroundColor Yellow

if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    
    # Update Stripe publishable key
    if ($envContent -match "VITE_STRIPE_PUBLISHABLE_KEY=") {
        $envContent = $envContent -replace "VITE_STRIPE_PUBLISHABLE_KEY=.*", "VITE_STRIPE_PUBLISHABLE_KEY=$stripePublishableKey"
        Write-Host "✅ Updated Stripe publishable key in .env" -ForegroundColor Green
    } else {
        $envContent += "`nVITE_STRIPE_PUBLISHABLE_KEY=$stripePublishableKey"
        Write-Host "✅ Added Stripe publishable key to .env" -ForegroundColor Green
    }
    
    $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
} else {
    Write-Host "⚠️  .env file not found. Creating new one..." -ForegroundColor Yellow
    $envContent = @"
# Supabase Configuration
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=$stripePublishableKey
"@
    $envContent | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ Created .env file" -ForegroundColor Green
}

# Step 3: Get Price IDs
Write-Host "`n💰 Step 3: Stripe Price IDs`n" -ForegroundColor Yellow
Write-Host "Please enter the Price IDs from your Stripe Dashboard:" -ForegroundColor White
Write-Host "(Go to: Products → Click each product → Copy the Price IDs)`n" -ForegroundColor Gray

$priceStarterMonthly = Read-Host "Starter Plan - Monthly Price ID (price_...)"
$priceStarterAnnual = Read-Host "Starter Plan - Annual Price ID (price_...)"
$priceGrowthMonthly = Read-Host "Growth Plan - Monthly Price ID (price_...)"
$priceGrowthAnnual = Read-Host "Growth Plan - Annual Price ID (price_...)"
$priceScaleMonthly = Read-Host "Scale Plan - Monthly Price ID (price_...)"
$priceScaleAnnual = Read-Host "Scale Plan - Annual Price ID (price_...)"

# Step 4: Update stripe.ts
Write-Host "`n📝 Step 4: Updating src/config/stripe.ts...`n" -ForegroundColor Yellow

$stripeConfigPath = "src/config/stripe.ts"
if (Test-Path $stripeConfigPath) {
    $stripeConfig = Get-Content $stripeConfigPath -Raw
    
    # Update price IDs
    $stripeConfig = $stripeConfig -replace "monthly: 'price_starter_monthly'", "monthly: '$priceStarterMonthly'"
    $stripeConfig = $stripeConfig -replace "annual: 'price_starter_annual'", "annual: '$priceStarterAnnual'"
    $stripeConfig = $stripeConfig -replace "monthly: 'price_growth_monthly'", "monthly: '$priceGrowthMonthly'"
    $stripeConfig = $stripeConfig -replace "annual: 'price_growth_annual'", "annual: '$priceGrowthAnnual'"
    $stripeConfig = $stripeConfig -replace "monthly: 'price_scale_monthly'", "monthly: '$priceScaleMonthly'"
    $stripeConfig = $stripeConfig -replace "annual: 'price_scale_annual'", "annual: '$priceScaleAnnual'"
    
    $stripeConfig | Out-File -FilePath $stripeConfigPath -Encoding utf8 -NoNewline
    Write-Host "✅ Updated stripe.ts with price IDs" -ForegroundColor Green
} else {
    Write-Host "⚠️  stripe.ts not found" -ForegroundColor Yellow
}

# Step 5: Supabase Secrets Instructions
Write-Host "`n🔒 Step 5: Supabase Secrets`n" -ForegroundColor Yellow
Write-Host "Now you need to set secrets in Supabase Dashboard:" -ForegroundColor White
Write-Host "1. Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions" -ForegroundColor Cyan
Write-Host "2. Scroll to: Secrets section" -ForegroundColor Cyan
Write-Host "3. Add these secrets:`n" -ForegroundColor Cyan

Write-Host "Secret Name: STRIPE_SECRET_KEY" -ForegroundColor White
Write-Host "Secret Value: $stripeSecretKey`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_STARTER_MONTHLY" -ForegroundColor White
Write-Host "Secret Value: $priceStarterMonthly`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_STARTER_ANNUAL" -ForegroundColor White
Write-Host "Secret Value: $priceStarterAnnual`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_GROWTH_MONTHLY" -ForegroundColor White
Write-Host "Secret Value: $priceGrowthMonthly`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_GROWTH_ANNUAL" -ForegroundColor White
Write-Host "Secret Value: $priceGrowthAnnual`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_SCALE_MONTHLY" -ForegroundColor White
Write-Host "Secret Value: $priceScaleMonthly`n" -ForegroundColor Gray

Write-Host "Secret Name: STRIPE_PRICE_SCALE_ANNUAL" -ForegroundColor White
Write-Host "Secret Value: $priceScaleAnnual`n" -ForegroundColor Gray

# Summary
Write-Host "`n✅ Configuration Summary`n" -ForegroundColor Green
Write-Host "Frontend (.env):" -ForegroundColor Yellow
Write-Host "  ✅ Stripe publishable key updated" -ForegroundColor Green
Write-Host "  ✅ Supabase URL and anon key ready" -ForegroundColor Green

Write-Host "`nFrontend (stripe.ts):" -ForegroundColor Yellow
Write-Host "  ✅ Price IDs updated" -ForegroundColor Green

Write-Host "`nBackend (Supabase Secrets):" -ForegroundColor Yellow
Write-Host "  ⚠️  Need to set manually in Dashboard (see above)" -ForegroundColor Yellow

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Set secrets in Supabase Dashboard (see above)" -ForegroundColor White
Write-Host "2. Deploy Edge Functions" -ForegroundColor White
Write-Host "3. Test the setup`n" -ForegroundColor White

Write-Host "🎉 Frontend configuration complete!" -ForegroundColor Green

