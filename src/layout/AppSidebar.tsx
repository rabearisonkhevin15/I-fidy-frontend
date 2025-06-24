// Importation des hooks React nécessaires pour gérer les états, effets et références
import { useCallback, useEffect, useRef, useState } from "react";

// Importation du composant pour la dropdown de notification (potentiellement utilisé ailleurs)

// Permet d'utiliser les liens et récupérer la route active
import { Link, useLocation } from "react-router";


// Importation des icônes utilisées dans le menu
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
} from "../icons";

// Importation du contexte Sidebar pour gérer l'état global de l'affichage du menu
import { useSidebar } from "../context/SidebarContext";

// Définition du type NavItem pour typer les éléments de menu (nom, icône, sous-menu, etc.)
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Liste des éléments principaux du menu de navigation
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de bord",
    path: "/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "Candidats",
    path: "/candidats",
  },
  {
    icon: <UserCircleIcon />,
    name: "Électeurs",
    path: "/electeurs",
  },
  {
    icon: <CalenderIcon />,
    name: "Élections",
    path: "/elections",
  },
  {
    icon: <PieChartIcon />,
    name: "Analyse en temps réel",
    subItems: [
      { name: "Carte en direct", path: "/analyse/carte" },
      { name: "Résultats Live", path: "/analyse/resultats" },
    ],
  },
];

// Éléments supplémentaires placés en bas du menu
const othersItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Paramètres",
    path: "/settings",
  },
];

// Composant principal AppSidebar
const AppSidebar: React.FC = () => {
  // Récupération des états depuis le contexte global du sidebar
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  // Hook pour connaître la route courante
  const location = useLocation();

  // État pour savoir quel sous-menu est actuellement ouvert
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  // Stocke dynamiquement la hauteur des sous-menus (pour animation smooth)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

  // Références vers chaque sous-menu DOM pour mesurer la hauteur
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Fonction qui retourne true si le path donné correspond à la route actuelle
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // À chaque changement de route, détecter si un sous-menu contient la route active
  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });
    // Si aucune correspondance trouvée, fermer tous les sous-menus
    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  // Lorsque le sous-menu est ouvert, calculer dynamiquement sa hauteur
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  // Gère l'ouverture/fermeture d'un sous-menu
  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null; // Fermer si déjà ouvert
      }
      return { type: menuType, index }; // Ouvrir sinon
    });
  };

  // Fonction qui affiche dynamiquement les éléments du menu (avec ou sans sous-menu)
  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            // Bouton cliquable pour les menus avec sous-éléments
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              {/* Icône du menu */}
              <span className={`menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                {nav.icon}
              </span>
              {/* Texte du menu affiché seulement si le menu est étendu ou hover */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {/* Chevron bas (flèche) pour indiquer le sous-menu */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            // Cas des éléments de menu simples (sans sous-menu)
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {/* Affichage des sous-éléments avec animation de hauteur */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      {/* Affichage des badges (pro, new) */}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className={`ml-auto ${
                            isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          } menu-dropdown-badge`}>
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className={`ml-auto ${
                            isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          } menu-dropdown-badge`}>
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  // Structure du layout global de la sidebar (responsive, hover, mobile)
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
  className={`py-8 px-20 flex items-center ${
    !isExpanded && !isHovered ? "justify-center" : "justify-start"

  }`}
>
  <Link to="/">
    {isExpanded || isHovered || isMobileOpen ? (
      <>
        <img
          className="dark:hidden"
          src="/images/logo/Logo.png"
          alt="Logo"
          width={80}
          height={20}
        />
        <img
          className="hidden dark:block"
          src="/images/logo/Logo.png"
          alt="Logo"
          width={80}
          height={20}
        />
      </>
    ) : (
      <img
        src="/images/logo/logo-icon.svg"
        alt="Logo"
        width={32}
        height={32}
      />
    )}
  </Link>
</div>


      {/* Navigation */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Section principale */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            {/* Section "others" */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
