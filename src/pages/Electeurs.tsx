import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddElecteurModal from "../components/crudElecteurs/AddElecteurModal";
import EditElecteurModal from "../components/crudElecteurs/EditElecteurModal";

interface Electeur {
  id: number;
  nom: string;
  email: string;
  arrondissement: string;
  photo?: string;
}

const Electeurs: React.FC = () => {
  const [electeurs, setElecteurs] = useState<Electeur[]>([]);
  const [selectedElecteur, setSelectedElecteur] = useState<Electeur | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAdd = (electeur: Omit<Electeur, "id">) => {
    const newElecteur: Electeur = {
      ...electeur,
      id: Date.now(),
    };
    setElecteurs((prev) => [...prev, newElecteur]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (updatedElecteur: Electeur) => {
    setElecteurs((prev) =>
      prev.map((e) => (e.id === updatedElecteur.id ? updatedElecteur : e))
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedElecteur) {
      setElecteurs((prev) => prev.filter((e) => e.id !== selectedElecteur.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedElecteur(null);
  };

  return (
    <div className="p-6 min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des électeurs</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition-all"
        >
          + Ajouter un électeur
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Photo</th>
              <th className="px-6 py-3 text-left font-medium">Nom</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Arrondissement</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {electeurs.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={e.photo || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-6 py-4">{e.nom}</td>
                <td className="px-6 py-4">{e.email}</td>
                <td className="px-6 py-4">{e.arrondissement}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedElecteur(e);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedElecteur(e);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {electeurs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  Aucun électeur enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Ajouter */}
      <AddElecteurModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      {/* Modal - Modifier */}
      {selectedElecteur && (
        <EditElecteurModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          electeur={selectedElecteur}
          onSave={handleEdit}
        />
      )}

      {/* Modal - Supprimer */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Supprimer l’électeur</h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Êtes-vous sûr de vouloir supprimer cet électeur ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Electeurs;
