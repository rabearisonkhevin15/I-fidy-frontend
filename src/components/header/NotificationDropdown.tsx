import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-4 w-80 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notifications</h5>
          <button onClick={closeDropdown} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            ✕
          </button>
        </div>

        <ul className="overflow-y-auto max-h-60">

          {/* exemple de Notification  */}
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <img src="/images/user/user-05.jpg" alt="User" className="w-10 h-10 rounded-full" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Brandon Philips</strong> demande à modifier <strong>Project - Nganter App</strong></p>
                <span className="text-xs text-gray-500 dark:text-gray-400">Il y a 1h</span>
              </div>
            </DropdownItem>
          </li>
        </ul>

        <div className="mt-3">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Voir toutes les notifications
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
