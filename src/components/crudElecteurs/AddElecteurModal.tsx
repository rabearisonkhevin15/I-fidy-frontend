import React from "react";

interface Electeur {
  nom: string;
  email: string;
  arrondissement: string;
  photo?: string;
}

interface AddElecteurModalProps {
  isOpen: boolean;
  onClose: () => void;
  electeur: Electeur;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const AddElecteurModal: React.FC<AddElecteurModalProps> = ({
  isOpen,
  onClose,
  electeur,
  onChange,
  onFileChange,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-[700px] w-full m-4 bg-white dark:bg-gray-900 rounded-3xl p-6 overflow-y-auto">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Ajouter un nouvel électeur
        </h4>
        <form className="flex flex-col">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {electeur.photo && (
                <img
                  src={electeur.photo}
                  alt="Photo preview"
                  className="w-20 h-20 rounded-full object-cover mt-2"
                />
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom & Prénom</label>
              <input
                type="text"
                name="nom"
                value={electeur.nom}
                onChange={onChange}
                className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={electeur.email}
                onChange={onChange}
                className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Arrondissement</label>
              <input
                type="text"
                name="arrondissement"
                value={electeur.arrondissement}
                onChange={onChange}
                className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 lg:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm dark:text-white hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="px-4 py-2 text-white bg-green-600 rounded text-sm hover:bg-green-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddElecteurModal;
