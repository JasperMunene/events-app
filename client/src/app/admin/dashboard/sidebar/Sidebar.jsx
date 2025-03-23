'use client';
import { Home, Calendar, Users, LineChart, Settings, LogOut, ShoppingCart } from "lucide-react";

const Sidebar = ({ setActivePage, active }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home />, component: "DashboardPage" },
    { name: "Events", icon: <Calendar />, component: "EventsPage" },
    { name: "Attendance", icon: <Users />, component: "AttendancePage" },
    { name: "Vendors", icon: <ShoppingCart />, component: "VendorsPage" },
    { name: "Analytics", icon: <LineChart />, component: "AnalyticsPage" },
    { name: "Settings", icon: <Settings />, component: "SettingsPage" },
  ];

  return (
    <div className="h-screen w-64 bg-orange-600 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold text-center py-4">MyLogo</div>
      <nav className="flex-1 mt-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              active === item.name ? "bg-orange-500 shadow-md" : "hover:bg-orange-700"
            }`}
            onClick={() => setActivePage(item.component, item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition-all">
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
