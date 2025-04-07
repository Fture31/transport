"use client"

import { useState, FormEvent } from "react"
import { Button } from "./ui/button"

// Définir les types des props
interface AuthFormProps {
  onSubmit: ({ email, password }: { email: string, password: string }) => void;
  isSignUp: boolean;
}

export default function AuthForm({ onSubmit, isSignUp }: AuthFormProps) {
  // Définir les états avec les types
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isSignUp && password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }
    onSubmit({ email, password })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6">{isSignUp ? "Inscription" : "Connexion"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            {isSignUp ? "S'inscrire" : "Se connecter"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          {isSignUp ? (
            <span>Vous avez déjà un compte ? <a href="#" onClick={() => window.location.href = "/login"} className="text-blue-600">Se connecter</a></span>
          ) : (
            <span>Pas encore de compte ? <a href="#" onClick={() => window.location.href = "/signup"} className="text-blue-600">S'inscrire</a></span>
          )}
        </div>
      </div>
    </div>
  )
}
