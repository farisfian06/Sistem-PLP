import DashboardCard from "@/Components/DashboardCard";
import {usePage} from "@inertiajs/react";
import {FaUserCircle, FaUser, FaUserFriends} from "react-icons/fa";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";

const DashboardMahasiswa: React.FC = () => {
    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-col lg:flex-col gap-6 mt-6 ">
            <div className="flex gap-3 w-full gap-6 flex-col lg:flex-row">
                <DashboardCard
                    heading={"Selamat datang"}
                    title={user.name}
                    icon={FaUserCircle}
                    className={"flex-1 w-full"}
                    buttonValue={"Edit Profile"}
                    buttonHref={"/profile"}
                />
                <DashboardCard
                    heading={"Anda telah berhasil mendaftar PLP"}
                    title={"SMKN 1 Malang"}
                    icon={FaCircleCheck}
                    className={"flex-1 w-full"}
                />
            </div>
            <div className="flex gap-3 w-full gap-6 flex-col md:flex-row">
                <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                    <DashboardCard
                        title={"Dosen Pembimbing"}
                        content={"Ir. Soekarno"}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                    <DashboardCard
                        title={"Guru Pamong"}
                        content={"Laksamana Maeda"}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                </div>
                <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                    <DashboardCard
                        title={"Lokasi"}
                        content={"SMKN 1 Malang"}
                        className={"flex-1 w-full"}
                        pIcon={FaLocationDot}
                    />
                    <DashboardCard
                        title={"Total Logbook"}
                        content={"15 Disetujui"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleCheck}
                    />
                </div>
            </div>

        </div>
    );
};

export default DashboardMahasiswa;
