import React from "react";

interface Electeur {
  nom: string;
  email: string;
  arrondissement: string;
  photo?: string;
}

interface EditElecteurModalProps {
  isOpen: boolean;
  onClose: () => void;
  electeur: Electeur;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const EditElecteurModal: React.FC<EditElecteurModalProps> = ({
  isOpen,
  onClose,
  electeur,
  onChange,
  onFileChange,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-[700px] w-full m-4 bg-white dark:bg-gray-900 rounded-3xl p-6 overflow-y-auto">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            Modifier l’électeur
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Mettez à jour les informations de l’électeur.
          </p>
        </div>

        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto">
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
                    alt="Photo actuelle"
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
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm dark:text-white hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 text-white bg-blue-600 rounded text-sm hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditElecteurModal;
