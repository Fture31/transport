"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import AddEditModal from "./AddEditModal"

export default function EnginTable() {
  const [engins, setEngins] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEngin, setCurrentEngin] = useState(null)

  // Charger les engins depuis l'API
// Charger les engins depuis l'API
useEffect(() => {
  const fetchEngins = async () => {
    try {
      const token = localStorage.getItem("token");  // Récupérer le token depuis le localStorage
      const response = await fetch("http://localhost:5000/engins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajouter le token dans l'en-tête
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEngins(data);
      } else {
        alert("Erreur lors de la récupération des engins");
      }
    } catch (error) {
      console.error("Erreur lors du fetch:", error);
      alert("Une erreur est survenue lors de la récupération des engins");
    }
  };

  fetchEngins();
}, []);


  // Ajouter ou mettre à jour un engin via l'API
  const handleSave = async (engin) => {
    try {
      const token = localStorage.getItem("token");
      const method = currentEngin ? "PUT" : "POST"
      const url = currentEngin ? `http://localhost:5000/engins/${engin.id}` : "http://localhost:5000/engins"

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajouter le token dans l'en-tête
        
        },
        body: JSON.stringify(engin),
      })

      const data = await response.json()

      if (response.ok) {
        if (currentEngin) {
          setEngins(engins.map((e) => (e.id === engin.id ? engin : e)))
        } else {
          setEngins([...engins, data])
        }
        setIsModalOpen(false)
        setCurrentEngin(null)
      } else {
        alert("Erreur lors de la sauvegarde de l'engin")
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error)
      alert("Une erreur est survenue")
    }
  }

  // Supprimer un engin via l'API
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");  // Récupérer le token depuis le localStorage
      const response = await fetch(`http://localhost:5000/engins/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,  // Ajouter le token dans l'en-tête
        },
      })

      if (response.ok) {
        setEngins(engins.filter((engin) => engin.id !== id))
      } else {
        alert("Erreur lors de la suppression de l'engin")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Une erreur est survenue lors de la suppression de l'engin")
    }
  }

  // Ouvrir le modal d'ajout ou d'édition
  const handleEdit = (engin) => {
    setCurrentEngin(engin)
    setIsModalOpen(true)
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
