"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"

export default function AddEditModal({ isOpen, onClose, onSave, engin }) {
  const [formData, setFormData] = useState({
    date: "",
    zone: "",
    marque: "",
    type: "ppm",
    poste: "",
    responsable: "",
    adresse: "",
    observation: "",
  })

  useEffect(() => {
    if (engin) {
      setFormData(engin)
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        zone: "",
        marque: "",
        type: "ppm",
        poste: "",
        responsable: "",
        adresse: "",
        observation: "",
      })
    }
  }, [engin, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: formData.id || 0,
    })
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{engin ? "Modifier l'engin" : "Ajouter un nouvel engin"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
                  <RadioGroupItem value="ppm" id="modal-ppm" />
                  <Label htmlFor="modal-ppm">PPM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pm" id="modal-pm" />
                  <Label htmlFor="modal-pm">PM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pgc" id="modal-pgc" />
                  <Label htmlFor="modal-pgc">PGC</Label>
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
          </div>

          <DialogFooter>
            <Button  className="text-white"type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">{engin ? "Mettre à jour" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

