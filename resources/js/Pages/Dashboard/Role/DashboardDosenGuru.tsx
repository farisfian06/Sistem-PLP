import DashboardCard from "@/Components/DashboardCard";
import {usePage} from "@inertiajs/react";
import {FaUserCircle, FaUser, FaUserFriends} from "react-icons/fa";
import {FaCircleCheck, FaCircleExclamation, FaCircleXmark} from "react-icons/fa6";
import {Authentication} from "@/types/types";

const DashboardMahasiswa: React.FC = () => {
    const {props} = usePage() as {
        props: {
            auth: { user: any },
            mahasiswaDibimbing: number,
            logbookDiajukan: number,
            logbookDitolak: number,
            logbookDisetujui: number,
        }
    };
    const user = usePage<Authentication>().props.auth.user;

    const mahasiswaDibimbing = props.mahasiswaDibimbing || 0
    const logbookDiajukan = props.logbookDiajukan || 0
    const logbookDitolak = props.logbookDitolak || 0
    const logbookDisetujui = props.logbookDisetujui || 0

console.log(mahasiswaDibimbing)

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
                heading={`Anda terdaftar sebagai ${user.role}`}
                icon={FaCircleCheck}
                className={"flex-1 w-full"}
            />
        </div>
        <div className="flex gap-3 w-full gap-6 flex-col md:flex-row">
            <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                <DashboardCard
                    title={"Mahasiswa dibimbing"}
                    contentNumber={mahasiswaDibimbing}
                    contentClass={"text-2xl"}
                    className={"flex-1 w-full"}
                    pIcon={FaUserFriends}
                />
                <DashboardCard
                    title={"Logbook sedang diajukan"}
                    contentNumber={logbookDiajukan}
                    className={"flex-1 w-full"}
                    pIcon={FaCircleExclamation}
                />
            </div>
            <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                <DashboardCard
                    title={"Logbook disetujui"}
                    contentNumber={logbookDisetujui}
                    className={"flex-1 w-full"}
                    pIcon={FaCircleCheck}
                />
                <DashboardCard
                    title={"Logbook ditolak"}
                    contentNumber={logbookDitolak}
                    className={"flex-1 w-full"}
                    pIcon={FaCircleXmark}
                />
            </div>
        </div>

    </div>
);
}
;

export default DashboardMahasiswa;
