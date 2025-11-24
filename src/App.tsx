import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { SolutionsBrandsPage } from './pages/SolutionsBrandsPage';
import { SolutionsContractorsPage } from './pages/SolutionsContractorsPage';
import { SolutionsEnterprisePage } from './pages/SolutionsEnterprisePage';
import { ReclovaPage } from './pages/ReclovaPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SandboxRequestPage } from './pages/SandboxRequestPage';
import { DriversPage } from './pages/DriversPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { GDPR } from './pages/GDPR';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/solutions/brands" element={<SolutionsBrandsPage />} />
          <Route path="/solutions/contractors" element={<SolutionsContractorsPage />} />
          <Route path="/solutions/enterprise" element={<SolutionsEnterprisePage />} />
          <Route path="/reclova" element={<ReclovaPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sandbox" element={<SandboxRequestPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/gdpr-compliance" element={<GDPR />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}