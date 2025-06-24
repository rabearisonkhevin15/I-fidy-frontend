import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const TOTAL_TIME_SECONDS = 5 * 60 * 60; // 5 heures en secondes
const MINUTE_SECONDS = 60;

const CompteARebour: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME_SECONDS);
  const [isOpen, setIsOpen] = useState(false);

  // Timer global : décrémente chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calcul % du graphique : sur 60 secondes, reset chaque minute
  const secondsInMinute = secondsLeft % MINUTE_SECONDS;
  const percentage = (secondsInMinute / MINUTE_SECONDS) * 100;

  // Formatage du temps restant total HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Options ApexCharts
  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        
        dynamicAnimation: {
          speed: 1000, // animation fluide à chaque seconde
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 0,
            fontSize: "24px",
            formatter: () => `${percentage.toFixed(0)}%`,
          },
        },
      },
    },
    fill: {
      colors: ["#3b82f6"], // blue-500
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const chartSeries = [percentage];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 pb-6 bg-white shadow-default rounded-2xl dark:bg-gray-900 sm:px-6 sm:pt-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Compte à Rebours
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Temps restant pour voter
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem onItemClick={closeDropdown}>Voir plus</DropdownItem>
              
            </Dropdown>
          </div>
        </div>

        {/* Graphique */}
        <div className="relative mt-6 flex justify-center">
          <Chart options={chartOptions} series={chartSeries} type="radialBar" height={250} />
        </div>

        {/* Temps restant total */}
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 animate-pulse">
            {formatTime(secondsLeft)}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Les votes se clôtureront automatiquement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompteARebour;
