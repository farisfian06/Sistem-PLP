import DashboardCard from "@/Components/DashboardCard";
import { usePage } from "@inertiajs/react";
import { FaUserCircle, FaUser, FaUserFriends } from "react-icons/fa";
import { FaCircleCheck, FaLocationDot, FaCircleXmark } from "react-icons/fa6";
import PendaftaranPlp from "@/Pages/PendaftaranPlp";

const DashboardMahasiswa: React.FC = () => {
    const { props } = usePage() as {
        props: {
            auth: { user: any };
            pendaftaranPlp: any[];
            guru: string;
            dospem: string;
            logbookDisetujui: number;
        };
    };
    const user = usePage().props.auth.user;

    const pendaftaranPlp =
        props.pendaftaranPlp.length > 0 ? props.pendaftaranPlp[0] : null;
    const guru = props.guru;
    const dospem = props.dospem;
    const logbookDisetujui = props.logbookDisetujui;

    console.log("pendaftaranPlp");
    console.log(logbookDisetujui);

    return (
        <div className="flex flex-col lg:flex-col gap-6 mt-6 ">
            <div className="flex gap-3 w-full flex-col lg:flex-row">
                <DashboardCard
                    heading={"Selamat datang"}
                    title={user.name}
                    icon={FaUserCircle}
                    className={"flex-1 w-full"}
                    buttonValue={"Edit Profile"}
                    buttonHref={"/profile"}
                />
                <DashboardCard
                    heading={
                        pendaftaranPlp
                            ? "Anda telah berhasil mendaftar PLP"
                            : "Anda belum mendaftar PLP"
                    }
                    title={
                        pendaftaranPlp
                            ? pendaftaranPlp.penempatan_smk?.name ||
                              "Silahkan tunggu untuk penentuan PLP anda"
                            : "Silahkan melakukan pendaftaran"
                    }
                    icon={pendaftaranPlp ? FaCircleCheck : FaCircleXmark}
                    className={"flex-1 w-full"}
                    buttonValue={!pendaftaranPlp && "Daftar PLP"}
                    buttonHref={!pendaftaranPlp && "/pendaftaran-plp"}
                />
            </div>
            <div className="flex gap-3 w-full  flex-col md:flex-row">
                <div className="flex gap-3 w-full  flex-col xl:flex-row">
                    <DashboardCard
                        title={"Dosen Pembimbing"}
                        content={dospem || "-"}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                    <DashboardCard
                        title={"Guru Pamong"}
                        content={guru || "-"}
                        className={"flex-1 w-full"}
                        pIcon={FaUserFriends}
                    />
                </div>
                <div className="flex gap-3 w-full flex-col xl:flex-row">
                    <DashboardCard
                        title={"Lokasi"}
                        content={pendaftaranPlp?.penempatan_smk?.name || "-"}
                        className={"flex-1 w-full"}
                        pIcon={FaLocationDot}
                    />
                    <DashboardCard
                        title={"Total Logbook"}
                        content={logbookDisetujui + " Disetujui"}
                        className={"flex-1 w-full"}
                        pIcon={FaCircleCheck}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardMahasiswa;
