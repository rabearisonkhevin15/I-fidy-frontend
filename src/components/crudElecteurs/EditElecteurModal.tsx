import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  electeur: {
    id: number;
    nom: string;
    email: string;
    arrondissement: string;
    photo?: string;
  };
  onSave: (electeur: {
    id: number;
    nom: string;
    email: string;
    arrondissement: string;
    photo?: string;
  }) => void;
}

const EditElecteurModal: React.FC<Props> = ({ isOpen, onClose, electeur, onSave }) => {
  const [form, setForm] = useState({ ...electeur });

  useEffect(() => {
    setForm({ ...electeur });
  }, [electeur]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Modifier l’électeur
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
          placeholder="URL photo"
          value={form.photo}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditElecteurModal;
