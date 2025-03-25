import { useState } from "react";
import { HiChartPie,HiDocumentAdd, HiBookOpen, HiCubeTransparent, HiUser, HiLogout, HiMenu, HiX} from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import {Link, router, usePage} from "@inertiajs/react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// model props yang diambil
type User = {
    id: number;
    name: string;
    angkatan: string;
};

// memastikan user authorization untuk props
declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User | null;
        };
    }
}

const SidebarComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const {auth} = usePage().props;

  // Handle logout
    const handleLogout = (): void => {
        router.post('/logout');
    };

  // sidebar Items
  const navItems: NavItem[] = [
    { href: route('dashboard'), label: "Dashboard", icon: <HiChartPie className="mr-3 text-xl" /> },
    { href: route('pendaftaran-plp.store'), label: "Pendaftaran Plp", icon: <HiDocumentAdd className="mr-3 text-xl" /> },
    { href: route('logbooks.store'), label: "Logbook", icon: <HiBookOpen className="mr-3 text-xl" /> },
  ];

  return (
    <div>
      {/* Sidebar untuk lg-screens */}
      <div
        className={`z-30 fixed h-screen dark w-80 bg-slate-100 text-gray-800 p-3 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} lg:block`}
      >
        <ul className="flex flex-col h-full justify-between">
            <div className={"flex flex-col "}>
                <li>
                    <h2 className="text-xl font-semibold p-3 flex items-center mt-3 mb-3">
                        <HiCubeTransparent className=" mr-2 text-indigo-500"/> Sistem Informasi PLP
                    </h2>
                </li>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className="hover:text-indigo-500 hover:bg-slate-200 p-3 flex items-center transition-all duration-200 ease-in-out rounded-xl">
                            {item.icon}
                            {item.label}
                        </Link>
                    </li>
                ))}
            </div>
            <div className={"space-y-2 flex flex-col "}>
                <li>
                    <button
                        onClick={handleLogout}
                        className="hover:text-indigo-500 hover:bg-slate-200 p-3 flex items-center w-full text-left transition-all duration-200 ease-in-out rounded-xl"
                    >
                        <HiLogout className="mr-3 text-xl"/>
                        Logout
                    </button>
                </li>
                <li>
                    <Link
                        href={"#"}
                        className="hover:text-indigo-500 hover:bg-slate-200 p-3 flex items-center transition-all duration-200 ease-in-out rounded-xl">
                        <FaUserCircle className="mr-3 text-xl" />
                        {auth.user && auth.user.name}
                    </Link>
                </li>
            </div>
        </ul>
      </div>

        {/* Toggle button untuk sm-screen */}
        <button
            className="z-40 lg:hidden fixed top-3 left-2 text-black p-3 rounded-full shadow-lg focus:outline-none"
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
