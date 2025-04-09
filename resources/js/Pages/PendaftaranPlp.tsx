import React, {useState, useEffect} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import {HiCheckCircle, HiExclamation} from "react-icons/hi";
import { TextInput, Label, Select, Button, Alert } from "flowbite-react";
import {Head, router, usePage} from "@inertiajs/react";

// model props user yang diambil
type User = {
    id: number;
    name: string;
    angkatan: string;
};

// deklarasi props yang diterima dari backend
declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User | null;
        };
        smks: {
            id: number;
            name: string;
        }[];
        keminatans: {
            id: number;
            name: string;
        }[];
        pendaftaranPlp: Array<{
            keminatan_id: number;
            nilai_plp_1: string;
            nilai_micro_teaching: string;
            pilihan_smk_1: number;
            pilihan_smk_2: number;
        }>;
    }
}

export default function PendaftaranPlp() {

    //ambil prop untuk ditampilkan
    const {auth, smks, keminatans, pendaftaranPlp} = usePage().props;

    // State untuk form data
    const [formData, setFormData] = useState({
        namaLengkap: "",
        angkatan: "",
        bidangKeahlian: "",
        nilaiPlp1: "",
        nilaiMicroTeaching: "",
        pilihanSmk1: "",
        pilihanSmk2: "",
    });

    // State untuk status pendaftaran dan error
    const [statusPendaftaran, setStatusPendaftaran] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sudahDaftar, setSudahDaftar] = useState<boolean>(false);

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Mengisi nama dan angkatan dari data user di database
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            namaLengkap: auth.user ? auth.user.name : '',
            angkatan: auth.user ? auth.user.angkatan : '',
        }));
    }, [auth]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Data yang dikirim:", formData);
        // Validasi semua form diisi
        const isFormValid = Object.values(formData).every((value) => value !== "");

        if (!isFormValid) {
            setErrorMessage("Semua field harus diisi!");
            return;
        }

        // Reset error message jika semua valid
        setErrorMessage(null);

        // Mengirim formData ke backend
        try {
            // fetch data dengan inertia
            router.post('/pendaftaran-plp', {
                keminatan_id: formData.bidangKeahlian,
                nilai_plp_1: formData.nilaiPlp1,
                nilai_micro_teaching: formData.nilaiMicroTeaching,
                pilihan_smk_1: formData.pilihanSmk1,
                pilihan_smk_2: formData.pilihanSmk2,
            }, {
                onSuccess: () => {
                    setSudahDaftar(true);
                    setErrorMessage(null);
                },
                onError: (errors) => {
                    setErrorMessage(errors.message || "Terjadi kesalahan saat mengirim data.");
                },
            });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
        }
    };

    // set message jika user sudah daftar
    useEffect(() => {
        if (sudahDaftar) {
            setStatusPendaftaran("Pendaftaran berhasil! Anda telah berhasil melakukan pendaftaran PLP. Penentuan lokasi dan dosen pembimbing Anda akan ditampilkan pada dashboard.");
        }
    }, [sudahDaftar]);

    // menampilkan data form bagi user yang sudah daftar
    useEffect(() => {
        if (pendaftaranPlp.length !== 0) {
            setFormData((prevFormData) => ({
                ...prevFormData, // Preserve the other form fields
                bidangKeahlian: pendaftaranPlp[0].keminatan_id.toString(),
                nilaiPlp1: pendaftaranPlp[0].nilai_plp_1.toString(),
                nilaiMicroTeaching: pendaftaranPlp[0].nilai_micro_teaching.toString(),
                pilihanSmk1: pendaftaranPlp[0].pilihan_smk_1.toString(),
                pilihanSmk2: pendaftaranPlp[0].pilihan_smk_2.toString(),
            }));
            setSudahDaftar(true);
        }
    }, [pendaftaranPlp]);

    // Form fields configuration
    const formFields = [
        {
            label: "Nama Lengkap",
            name: "namaLengkap",
            type: "text",
            value: formData.namaLengkap,
            placeholder: "Masukkan Nama Lengkap",
        },
        {
            label: "Angkatan",
            name: "angkatan",
            type: "text",
            value: formData.angkatan,
            placeholder: "Masukkan Angkatan",
        },
        {
            label: "Bidang Keahlian",
            name: "bidangKeahlian",
            type: "select",
            value: formData.bidangKeahlian,
            placeholder: "Pilih Bidang Keahlian",
            options: keminatans.map(keminatan => ({
                value: keminatan.id,
                label: keminatan.name
            })),
        },
        {
            label: "Nilai PLP 1",
            name: "nilaiPlp1",
            type: "select",
            value: formData.nilaiPlp1,
            placeholder: "Pilih Nilai Plp I",
            options: [
                { value: "A", label: "A" },
                { value: "B+", label: "B+" },
                { value: "B", label: "B" },
                { value: "C+", label: "C+" },
                { value: "C", label: "C" },
                { value: "D", label: "D" },
                { value: "E", label: "E" },
                { value: "Belum", label: "Belum" },
            ],
        },
        {
            label: "Nilai Micro Teaching",
            name: "nilaiMicroTeaching",
            type: "select",
            value: formData.nilaiMicroTeaching,
            placeholder: "Pilih Nilai Micro Teaching",
            options: [
                { value: "A", label: "A" },
                { value: "B+", label: "B+" },
                { value: "B", label: "B" },
                { value: "C+", label: "C+" },
                { value: "C", label: "C" },
                { value: "D", label: "D" },
                { value: "E", label: "E" },
                { value: "Belum", label: "Belum" },
            ],
        },
        {
            label: "Pilihan SMK 1",
            name: "pilihanSmk1",
            type: "select",
            value: formData.pilihanSmk1,
            placeholder: "Pilih SMK yang Diminati",
            options: smks.map(smk => ({
                value: smk.id,
                label: smk.name
            }))
        },

        {
            label: "Pilihan SMK 2",
            name: "pilihanSmk2",
            type: "select",
            value: formData.pilihanSmk2,
            placeholder: "Pilih SMK yang Diminati",
            options: smks.map(smk => ({
                value: smk.id,
                label: smk.name
            }))
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row">
        <Head title="PendaftaranPLP" />
            <SidebarComponent />
        <div className="flex-1 p-6 lg:ml-64 mt-16">
        <h2 className="text-xl font-semibold mb-4">Formulir Pendaftaran PLP</h2>

        {/* Menampilkan pesan status pendaftaran */}
        {statusPendaftaran && (
            <Alert color="success" icon={HiCheckCircle} className="mb-6">
                <span className="font-bold">Pendaftaran berhasil!</span> {statusPendaftaran.replace("Pendaftaran berhasil!", "").trim()}
            </Alert>
        )}

        {/* Menampilkan pesan error jika ada */}
        {errorMessage && (
            <Alert color="failure" icon={HiExclamation} className="mb-6">
                <span className="font-medium">Pendaftaran gagal!</span> {errorMessage}
            </Alert>
        )}

                <form onSubmit={handleSubmit}
                      className="w-full max-w-6xl p-6 border rounded-lg shadow-lg bg-white"
                    >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Render form fields */}
                    {formFields.map((field, index) => (
                        <div className={`mb-4 ${field.name === 'bidangKeahlian' ? 'lg:col-span-2' : ''}`} key={index}>
                             <Label htmlFor={field.name}>{field.label}</Label>
                            {field.type === "select" ? (
                                <Select
                                    id={field.name}                                
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                    disabled={sudahDaftar}
                                    className="w-full"
                                >
                                    <option value="" disabled hidden>
                                        {field.placeholder}
                                    </option>
                                    {field.options?.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                <TextInput
                                    id={field.name}                                
                                    type={field.type}
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                    className="w-full"
                                    placeholder={field.placeholder}
                                    disabled
                                />
                            )}
                        </div>
                    ))}
            </div>
                    <Button type="submit"
                            disabled={sudahDaftar}
                            className={`w-fit text-white px-5 py-2.5 ${sudahDaftar ? "cursor-not-allowed bg-neutral-500 " : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "}`}>
                        Daftar PLP
                    </Button>
                </form>
            </div>
        </div>
    );
}
