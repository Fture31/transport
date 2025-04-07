import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import EnginTable from "./components/EnginTable"
import { Button } from "./components/ui/button"
import { PlusCircle } from "lucide-react"
import Login from "./Page/Login"
import SignUp from "./Page/SignUp"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/ajouter" element={<AjouterEngin />} />
        <Route path="/login" element={<Login />} />   {/* Ajouter route pour Login */}
        {/* <Route path="/signup" element={<SignUp />} /> Ajouter route pour Inscription *} */}
    
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
{/* 
      <div className="flex justify-end  mb-4">
        <Link to="/ajouter">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4  " />
            Ajouter un engin
          </Button>
        </Link>
      </div> */}

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

