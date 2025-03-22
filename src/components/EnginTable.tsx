"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import AddEditModal from "./AddEditModal"

// Données fictives pour l'exemple
const initialData = [
  {
    id: 1,
    date: "2023-01-15",
    zone: "Zone A",
    marque: "Yamaha",
    type: "ppm",
    poste: "Port Central",
    responsable: "Jean Dupont",
    adresse: "123 Rue du Port",
    observation: "Bon état général",
  },
  {
    id: 2,
    date: "2023-02-20",
    zone: "Zone B",
    marque: "Mercury",
    type: "pm",
    poste: "Embarcadère Sud",
    responsable: "Marie Martin",
    adresse: "45 Avenue du Lac",
    observation: "Nécessite une révision",
  },
  {
    id: 3,
    date: "2023-03-10",
    zone: "Zone C",
    marque: "Suzuki",
    type: "pgc",
    poste: "Quai Nord",
    responsable: "Pierre Dubois",
    adresse: "78 Boulevard Maritime",
    observation: "",
  },
]

export default function EnginTable() {
  const [engins, setEngins] = useState(initialData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEngin, setCurrentEngin] = useState(null)

  const handleDelete = (id) => {
    setEngins(engins.filter((engin) => engin.id !== id))
  }

  const handleEdit = (engin) => {
    setCurrentEngin(engin)
    setIsModalOpen(true)
  }

  const handleSave = (engin) => {
    if (currentEngin) {
      // Mise à jour d'un engin existant
      setEngins(engins.map((e) => (e.id === engin.id ? engin : e)))
    } else {
      // Ajout d'un nouvel engin
      const newId = Math.max(...engins.map((e) => e.id), 0) + 1
      setEngins([...engins, { ...engin, id: newId }])
    }
    setIsModalOpen(false)
    setCurrentEngin(null)
  }

  const handleAddNew = () => {
    setCurrentEngin(null)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">N°</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead className="text-center">
                  <div>Type</div>
                  <div className="flex justify-between px-4 text-xs">
                    <span>PPM</span>
                    <span>PM</span>
                    <span>PGC</span>
                  </div>
                </TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Observation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engins.map((engin, index) => (
                <TableRow key={engin.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(engin.date).toLocaleDateString()}</TableCell>
                  <TableCell>{engin.zone}</TableCell>
                  <TableCell>{engin.marque}</TableCell>
                  <TableCell>
                    <div className="flex justify-between px-4">
                      <span>{engin.type === "ppm" ? "✓" : ""}</span>
                      <span>{engin.type === "pm" ? "✓" : ""}</span>
                      <span>{engin.type === "pgc" ? "✓" : ""}</span>
                    </div>
                  </TableCell>
                  <TableCell>{engin.poste}</TableCell>
                  <TableCell>{engin.responsable}</TableCell>
                  <TableCell>{engin.adresse}</TableCell>
                  <TableCell>{engin.observation}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(engin)}>
                        <Edit className="h-4 w-4 " />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-white">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer cet engin ? Cette action ne peut pas être annulée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-white">Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(engin.id)}
                              className="bg-white text-white hover:bg-blue-600"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          Ajouter un nouvel engin
        </Button>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        engin={currentEngin}
      />
    </>
  )
}

