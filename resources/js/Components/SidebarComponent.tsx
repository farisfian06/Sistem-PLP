import {useState} from "react";
import {
    HiChartPie,
    HiDocumentAdd,
    HiBookOpen,
    HiCubeTransparent,
    HiUser,
    HiUsers,
    HiDatabase,
    HiTable
} from "react-icons/hi";
import {FaUserCircle} from "react-icons/fa";
import {Link, router, usePage} from "@inertiajs/react";
import {Authentication, NavItem} from "@/types/types";
import SidebarCollapse from "@/Components/SidebarCollapse";


const SidebarComponent: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {auth} = usePage<Authentication>().props;

    // Handle logout
    const handleLogout = (): void => {
        router.post('/logout');
    };

    // sidebar Items
    let navItems: NavItem[] = [];

    if (auth.user?.role === "Mahasiswa") {
        navItems = [
            {href: route('dashboard'), label: "Dashboard", icon: <HiChartPie className="w-5 h-5"/>},
            {
                href: route('pendaftaran-plp.store'),
                label: "Pendaftaran Plp",
                icon: <HiDocumentAdd className="w-5 h-5"/>
            },
            {href: route('logbooks.index'), label: "Logbook", icon: <HiBookOpen className="w-5 h-5"/>},
        ];
    } else if (auth.user?.role === "Guru" || auth.user?.role === "Dosen Pembimbing") {
        navItems = [
            {href: route('dashboard'), label: "Dashboard", icon: <HiChartPie className="w-5 h-5"/>},
            {href: route('logbooks.validasi'), label: "Validasi Logbook", icon: <HiBookOpen className="w-5 h-5"/>},
        ];
    } else if (auth.user?.role === "Kaprodi" || auth.user?.role === "Dosen Koordinator" || auth.user?.role === "Akademik") {
        navItems = [
            {href: route('dashboard'), label: "Dashboard", icon: <HiChartPie className="w-5 h-5"/>},
            {href: route('pembagian-plp'), label: "Pembagian PLP", icon: <HiTable className="w-5 h-5"/>},
            {
                icon: <HiUsers className="w-5 h-5"/>, label: "Kelola Akun", collapse: [
                    {href: route('input-akun-pamong'), label: "Akun Guru Pamong"},
                    {href: route('input-akun-pj'), label: "Akun PJ Sekolah"},
                    {href: route('input-akun-dosen'), label: "Akun Dosen"},
                ]
            },
            {
                icon: <HiDatabase className="w-5 h-5"/>, label: "Kelola Data", collapse: [
                    {href: route('input-smk'), label: "Data SMK"},
                    {href: route('input-keminatan'), label: "Data Keminatan"},
                ]
            },

        ];
    }


    return (
        <>
            {/* Top Navbar */}
            <nav
                className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Toggle Sidebar Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <span className="flex items-center ms-2 text-xl font-semibold text-gray-900 dark:text-white">
                            <Link href={"/dashboard"}>Sistem Informasi PLP</Link>

            </span>
                    </div>

                    {/* User Dropdown */}
                    <div className="relative ml-auto">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center justify-center w-8 h-8 bg-white rounded-full focus:ring-2 focus:ring-gray-300 dark:bg-white dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open user menu</span>
                            <FaUserCircle className="w-8 h-8 text-gray-400 dark:text-gray-900"/>
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    {auth.user?.name}
                                    {/*<div className="text-xs text-gray-500 dark:text-gray-300">{auth.user?.angkatan}</div>*/}
                                    <div
                                        className="text-xs text-gray-500 dark:text-gray-300">{auth.user?.role === "Mahasiswa" ? JSON.parse(auth.user?.details).nim : auth.user?.role}</div>
                                </div>
                                <ul>
                                    <li>
                                        <Link href={route('profile.edit')}
                                              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">Profil</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            item.collapse ? <SidebarCollapse key={index}
                                                             icon={item.icon}
                                                             items={item.collapse}
                                                             label={item.label}
                                /> :
                                <li key={index}>
                                    <Link
                                        href={item.href || ""}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </Link>
                                </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SidebarComponent;
