"use client"

import AuthForm from "../components/AuthForm"

// Définir les types des props pour AuthForm
interface SignUpProps {
  email: string;
  password: string;
}

export default function SignUp() {
  const handleSignUp = async ({ email, password }: SignUpProps) => {
    // Logique d'inscription (API, création de l'utilisateur, etc.)
    console.log("Inscription", email, password)
    // Redirection après succès
    window.location.href = "/login"
  }

  return <AuthForm onSubmit={handleSignUp} isSignUp={true} />
}
