import { Routes, Route, Navigate } from 'react-router-dom'
import { loadProfile } from './lib/storage'
import Layout from './components/Layout'
import SetupPage from './pages/SetupPage'
import HomePage from './pages/HomePage'
import AssessPage from './pages/AssessPage'
import StrokePage from './pages/StrokePage'
import CprPage from './pages/CprPage'
import LevelsPage from './pages/LevelsPage'
import SamplePage from './pages/SamplePage'
import ContactsPage from './pages/ContactsPage'
import PatientInfoPage from './pages/PatientInfoPage'

function RequireSetup({ children }: { children: React.ReactNode }) {
  const profile = loadProfile()
  if (!profile || !profile.elderName) return <Navigate to="/setup" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/" element={<RequireSetup><Layout /></RequireSetup>}>
        <Route index element={<HomePage />} />
        <Route path="assess" element={<AssessPage />} />
        <Route path="stroke" element={<StrokePage />} />
        <Route path="cpr" element={<CprPage />} />
        <Route path="levels" element={<LevelsPage />} />
        <Route path="sample" element={<SamplePage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="info" element={<PatientInfoPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
