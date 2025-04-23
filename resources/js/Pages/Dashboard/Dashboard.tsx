import SidebarComponent from "@/Components/SidebarComponent";
import { FaRegFileExcel } from "react-icons/fa6";
import {Head, usePage} from '@inertiajs/react';
import DashboardMahasiswa from "@/Pages/Dashboard/Role/DashboardMahasiswa";
import DashboardDosenGuru from "@/Pages/Dashboard/Role/DashboardDosenGuru";
import DashboardAkademik from "@/Pages/Dashboard/Role/DashboardAkademik";
import {Authentication} from "@/types/types";

const Dashboard: React.FC = () => {

    const {props} = usePage();
    const user = usePage<Authentication>().props.auth.user;

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
                    } else if (user.role === "Kaprodi" || user.role === "Dosen Koordinator" || user.role === "Akademik") {
                        return (
                            <DashboardAkademik/>
                        )
                    }
                })()}

            </div>
        </div>
    );
};

export default Dashboard;
