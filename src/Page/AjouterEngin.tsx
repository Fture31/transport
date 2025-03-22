"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Textarea } from "../components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function AjouterEngin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    date: "",
    zone: "",
    marque: "",
    poste: "",
    responsable: "",
    adresse: "",
    observation: "",
    type: "ppm", // par défaut
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à une API
    console.log(formData)

    // Rediriger vers la page principale
    navigate("/")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center gap-2 text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Ajouter un nouvel engin</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone">Zone d'identification</Label>
                <Input id="zone" name="zone" value={formData.zone} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marque">Marque d'engin</Label>
              <Input id="marque" name="marque" value={formData.marque} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Type d'engin</Label>
              <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ppm" id="ppm" />
                  <Label htmlFor="ppm">PPM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pm" id="pm" />
                  <Label htmlFor="pm">PM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pgc" id="pgc" />
                  <Label htmlFor="pgc">PGC</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="poste">Poste d'embarquement/débarquement</Label>
              <Input id="poste" name="poste" value={formData.poste} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable d'engin</Label>
              <Input
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse</Label>
              <Input id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observation">Observation</Label>
              <Textarea
                id="observation"
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/")}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

