import React from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate
import  AuthForm  from "../components/AuthForm";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate(); // Utilisation du hook useNavigate

  const handleLogin = async ({ email, password }: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/HomePage "); // Redirection avec navigate
      } else {
        alert("Identifiants incorrects.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Une erreur est survenue.");
    }
  };

  return <AuthForm onSubmit={handleLogin} isSignUp={false} />;
};

export default Login;
