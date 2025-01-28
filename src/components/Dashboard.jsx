import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SideBar from "./Sidebar";
import { HiMenu, HiX } from "react-icons/hi"; // Importing Hamburger and Cross icons

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for controlling sidebar visibility

  const cardData = [
    { label: "Users", value: 140, color: "text-blue-500" },
    { label: "Referred Users", value: 64, color: "text-green-500" },
    { label: "Today's Organic Users", value: 76, color: "text-yellow-500" },
    { label: "This Week Users", value: 679, color: "text-red-500" },
    { label: "This Month Users", value: 22727, color: "text-purple-500" },
    { label: "Last Month Users", value: 71291, color: "text-indigo-500" },
  ];

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Registrations",
        data: [700, 650, 600, 550, 500, 520, 200],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36A2EB",
      },
      {
        label: "Referrals",
        data: [300, 290, 280, 260, 250, 240, 100],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - only visible on large screens */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 bg-gray-800 text-white h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <SideBar />
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 p-6 overflow-auto transition-all ${
          isSidebarOpen ? "lg:ml-64" : ""
        } lg:ml-64`}
      >
        {/* Header for Medium and Small Screens */}
        <div className="lg:hidden flex justify-between items-center relative z-50">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <HiX className="text-2xl text-gray-700 z-50 ml-60" />
            ) : (
              <HiMenu className="text-2xl text-gray-700 z-50" />
            )}
          </button>
          <h2 className="text-xl font-bold">Analytics</h2>
        </div>

        {/* Header for Large Screens with Search Bar */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Analytics</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Select Data Range"
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card flex p-4 border rounded-md shadow-md"
            >
              <div>
                <h2 className="flex items-center text-lg font-bold">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  {card.label}
                </h2>

                <div className={`card-footer mt-4 ${card.color} text-lg font-bold justify-end`}>
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graph */}
        <div className="mt-6 h-92">
          <h3 className="text-lg font-semibold">
            Last 7 Days: Registrations vs Referrals
          </h3>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


  