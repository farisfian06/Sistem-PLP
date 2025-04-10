import SidebarComponent from "@/Components/SidebarComponent";
import { FaRegFileExcel } from "react-icons/fa6";
import {Head, usePage} from '@inertiajs/react';
import DashboardMahasiswa from "@/Pages/Dashboard/Role/DashboardMahasiswa";
import DashboardDosenGuru from "@/Pages/Dashboard/Role/DashboardDosenGuru";

const Dashboard: React.FC = () => {

    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <SidebarComponent />
            {/* Konten Utama */}
            <div className="flex-1 p-6 lg:ml-64 mt-16">
                <Head title="Dashboard"/>

                <h1 className="text-xl font-bold">Dashboard</h1>

                {/*Perbedaan isi dashboard berdasarkan role*/}
                {(() => {
                    if (user.role === "Mahasiswa") {
                        return (
                            <DashboardMahasiswa/>
                        )
                    } else if (user.role === "Dosen Pembimbing" || user.role === "Guru") {
                        return (
                            <DashboardDosenGuru/>
                        )
                    }
                })()}

            </div>
        </div>
    );
};

export default Dashboard;
