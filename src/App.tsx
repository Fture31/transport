import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import EnginTable from "./components/EnginTable"

import Login from "./Page/Login"


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />  {/* Page de connexion comme première page */}
      <Route path="/HomePage" element={<HomePage />} /> 
      </Routes>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8  text-gray-500">
        FICHE DE RECENSEMENT DES ENGINS DES TRANSPORTS FLUVIAL ET LACUSTRE
      </h1>
      <EnginTable />
      <div className="mt-6 bg-gray-200 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Légende :</h3>
        <ul className="space-y-1">
          <li>
            <span className="font-medium">PPM</span> - pirogue à petit modèle
          </li>
          <li>
            <span className="font-medium">PM</span> - pirogue moyen
          </li>
          <li>
            <span className="font-medium">PGC</span> - Pirogue à grand capacité
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App

