import DashboardCard from "@/Components/DashboardCard";
import {usePage} from "@inertiajs/react";
import {FaUserCircle, FaUser, FaUserFriends} from "react-icons/fa";
import {FaCircleCheck, FaCircleExclamation, FaCircleXmark} from "react-icons/fa6";
import {Authentication} from "@/types/types";

const DashboardMahasiswa: React.FC = () => {
    const {props} = usePage() as {
        props: {
            auth: { user: any },
            menungguPembagian: number,
            mahasiswaTerdaftar: number,
            dosenPembimbingTerdaftar: number,
            guruPamongTerdaftar: number,
        }
    };
    const user = usePage<Authentication>().props.auth.user;

    const menungguPembagian = props.menungguPembagian || 0;
    const mahasiswaTerdaftar = props.mahasiswaTerdaftar || 0;
    const dosenPembimbingTerdaftar = props.dosenPembimbingTerdaftar || 0;
    const guruPamongTerdaftar = props.guruPamongTerdaftar || 0;

    console.log(props);

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
                        title={"Menunggu Pembagian PLP"}
                        contentNumber={menungguPembagian}
                        contentClass={"text-2xl"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleExclamation}
                    />
                    <DashboardCard
                        title={"Mahasiswa Terdaftar PLP"}
                        contentNumber={mahasiswaTerdaftar}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleCheck}
                    />
                </div>
                <div className="flex gap-3 w-full gap-6 flex-col xl:flex-row">
                    <DashboardCard
                        title={"Dosen Pembimbing Terdaftar"}
                        contentNumber={dosenPembimbingTerdaftar}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                    <DashboardCard
                        title={"Guru Pamong Terdaftar"}
                        contentNumber={guruPamongTerdaftar}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                </div>
            </div>

        </div>
    );
};

export default DashboardMahasiswa;
