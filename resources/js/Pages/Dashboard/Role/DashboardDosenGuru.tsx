import DashboardCard from "@/Components/DashboardCard";
import {usePage} from "@inertiajs/react";
import {FaUserCircle, FaUser, FaUserFriends} from "react-icons/fa";
import { FaCircleCheck, FaCircleExclamation, FaCircleXmark } from "react-icons/fa6";

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
                        title={"Mahasiswa dibimbing"}
                        contentNumber={"5"}
                        contentClass={"text-2xl"}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                    <DashboardCard
                        title={"Logbook sedang diajukan"}
                        contentNumber={"3"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleExclamation}
                    />
                </div>
                <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                    <DashboardCard
                        title={"Logbook disetujui"}
                        contentNumber={"5"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleCheck}
                    />
                    <DashboardCard
                        title={"Logbook ditolak"}
                        contentNumber={"15"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleXmark}
                    />
                </div>
            </div>

        </div>
    );
};

export default DashboardMahasiswa;
