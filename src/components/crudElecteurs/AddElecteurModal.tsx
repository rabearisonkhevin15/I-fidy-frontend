import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (electeur: {
    nom: string;
    email: string;
    arrondissement: string;
    photo?: string;
  }) => void;
}

const AddElecteurModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    arrondissement: "",
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({ nom: "", email: "", arrondissement: "", photo: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Ajouter un électeur
        </h2>
        <input
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          name="arrondissement"
          placeholder="Arrondissement"
          value={form.arrondissement}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          name="photo"
          placeholder="URL photo (optionnel)"
          value={form.photo}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddElecteurModal;
