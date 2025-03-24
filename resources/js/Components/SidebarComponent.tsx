import { useState } from "react";
import { HiChartPie, HiBookOpen, HiUser, HiLogout, HiMenu, HiX} from "react-icons/hi";
import { Link } from "@inertiajs/react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SidebarComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Handle logout
  const handleLogout = (): void => {
    window.location.href = '/logout';
  };

  // sidebar Items
  const navItems: NavItem[] = [
    { href: route('dashboard'), label: "Dashboard", icon: <HiChartPie className="mr-3 text-xl" /> },
    { href: route('pendaftaran-plp.store'), label: "Pendaftaran Plp", icon: <HiChartPie className="mr-3 text-xl" /> },
    { href: route('logbooks.store'), label: "Logbook", icon: <HiBookOpen className="mr-3 text-xl" /> },
    { href: route('profile.edit'), label: "Profile", icon: <HiUser className="mr-3 text-xl" /> },
  ];

  return (
    <div>
      {/* Sidebar untuk lg-screens */}
      <div
        className={`fixed top-6 left-6 bottom-6 w-64 bg-white text-gray-800 p-5 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} sm:block`}
      >
        <h2 className="text-xl font-semibold flex items-center mt-3 mb-6">
          <HiChartPie className=" mr-2 text-indigo-500" /> SistemPLP
        </h2>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="hover:text-indigo-500 py-2 flex items-center transition-all duration-200 ease-in-out"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-indigo-500 py-2 flex items-center w-full text-left transition-all duration-200 ease-in-out"
            >
              <HiLogout className="mr-3 text-xl" />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Toggle button untuk sm-screen */}
      <button
        className="sm:hidden fixed top-3 left-2 text-black p-3 rounded-full shadow-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <HiX
          className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default SidebarComponent;
