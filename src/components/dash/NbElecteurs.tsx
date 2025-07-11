import {
    ArrowDownIcon,
    ArrowUpIcon,
    GroupIcon,
  } from "../../icons";
  import Badge from "../ui/badge/Badge";
  import { MdHowToVote } from "react-icons/md";
  
  const NbElecteurs: React.FC = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* Bloc Électeurs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MdHowToVote className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Nombres des Candidats
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                14
              </h4>
            </div>
            <Badge color="error">
              <ArrowDownIcon />
              -10%
            </Badge>
          </div>
        </div>
  
        {/* Bloc Votes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Nombres des Électeurs
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                135.000.000
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              +71%
            </Badge>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default NbElecteurs;
  