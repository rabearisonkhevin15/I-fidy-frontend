import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditElecteurModal from "../components/crudElecteurs/EditElecteurModal";
import AddElecteurModal from "../components/crudElecteurs/AddElecteurModal";

interface Electeur {
  id?: number;
  nom: string;
  email: string;
  arrondissement: string;
  photo?: string;
}

const Electeurs: React.FC = () => {
  const [electeurs, setElecteurs] = useState<Electeur[]>([
    {
      id: 1,
      nom: "Jean Randri",
      email: "jean@email.com",
      arrondissement: "IV",
      photo: "https://via.placeholder.com/40",
    },
  ]);

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedElecteur, setSelectedElecteur] = useState<Electeur | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newElecteur, setNewElecteur] = useState<Electeur>({
    nom: "",
    email: "",
    arrondissement: "",
    photo: "",
  });
  const [newSelectedFile, setNewSelectedFile] = useState<File | null>(null);

  // --- ÉDITION ---
  const handleEditClick = (electeur: Electeur) => {
    setSelectedElecteur(electeur);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElecteur) return;
    setSelectedElecteur({ ...selectedElecteur, [e.target.name]: e.target.value });
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElecteur) return;
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () =>
        setSelectedElecteur((prev) =>
          prev ? { ...prev, photo: reader.result as string } : null
        );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    // Appel API PUT ici...
    setIsEditModalOpen(false);
  };

  // --- AJOUT ---
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewSelectedFile(null);
    setNewElecteur({ nom: "", email: "", arrondissement: "", photo: "" });
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewElecteur({ ...newElecteur, [e.target.name]: e.target.value });
  };

  const handleAddFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () =>
        setNewElecteur((prev) => ({ ...prev, photo: reader.result as string }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdd = async () => {
    // API POST
    closeAddModal();
  };

  // --- SUPPRESSION ---
  const handleDeleteClick = (electeur: Electeur) => {
    setSelectedElecteur(electeur);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedElecteur?.id) return;
    try {
      await fetch(`http://localhost:8000/api/electeurs/${selectedElecteur.id}/`, {
        method: "DELETE",
      });
      setElecteurs((prev) => prev.filter((e) => e.id !== selectedElecteur.id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedElecteur(null);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Liste des électeurs
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm font-medium transition"
        >
          + Ajouter un nouvel électeur
        </button>
      </div>

      {/* TABLEAU */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-sm">
              <th className="px-6 py-3 text-left">Photo</th>
              <th className="px-6 py-3 text-left">Nom & Prénom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Arrondissement</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {electeurs.map((e) => (
              <tr key={e.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  <img
                    src={e.photo || "https://via.placeholder.com/40"}
                    alt="Photo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">{e.nom}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{e.email}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{e.arrondissement}</td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEditClick(e)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteClick(e)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {selectedElecteur && (
        <EditElecteurModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          electeur={selectedElecteur}
          onChange={handleEditChange}
          onFileChange={handleEditFileChange}
          onSave={handleSave}
        />
      )}

      <AddElecteurModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        electeur={newElecteur}
        onChange={handleAddChange}
        onFileChange={handleAddFileChange}
        onAdd={handleAdd}
      />

      {/* MODAL SUPPRESSION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Voulez-vous vraiment supprimer cet électeur ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Non
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Electeurs;
