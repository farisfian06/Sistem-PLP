import React, {useState, useMemo, useEffect} from "react";
import {Head, router, usePage} from "@inertiajs/react";
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Alert} from "flowbite-react";
import {HiPencil, HiTrash, HiUserGroup, HiAcademicCap } from "react-icons/hi";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateSmk from "@/Components/AddUpdateSmk";
import {FlashProps, Smk} from "@/types/types";
import AddUpdateAkunDosen from "@/Components/AddUpdateAkunDosen";
import ConfirmationModal from "@/Components/ConfirmationModal";
import InputDataPJ from "@/Pages/Input/InputDataPJ";
import DataMahasiswaPLP from "@/Pages/Input/DataMahasiswaPLP";

const InputSmk = () => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const smks = Array.isArray(props.smks) ? props.smks : [];

    const [openModal, setOpenModal] = useState(false);
    const [openDataPJ, setopenDataPJ] = useState(false);
    const [openDataMahasiswa, setopenDataMahasiswa] = useState(false);
    const [smkToEdit, setSmkToEdit] = useState<Smk | null>(null);
    const [smkToSeePJ, setSmkToSeePJ] = useState({
        id: null,
        name: null,
    });
    const [smkToSeeMahasiswa, setSmkToSeeMahasiswa] = useState({
        id: null,
        name: null,
    });
    const [smkToDelete, setSmkToDelete] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })
    const [errorMessage, setErrorMessage] = useState("")


    const sortedSmkList = useMemo(() => {
        return [...smks].sort((a, b) => {
            const getNumber = (name: string) => parseInt(name.match(/\d+/)?.[0] || "0");
            return getNumber(a.name) - getNumber(b.name);
        });
    }, [smks]);

    const handleAdd = () => {
        setSmkToEdit(null);
        setOpenModal(true);
    };

    const handleEdit = (Smk: Smk) => {
        setSmkToEdit(Smk);
        setOpenModal(true);
    };

    const handleDelete = (id: number) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        router.delete(`/smk/${id}`, {
            onSuccess: () => {
                setProcessing(false);
                setSmkToDelete(null);
                setOpenConfirmation(false);
                router.reload({only: ['smks']});
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const handleDeleteRequest = (id: number) => {
        setSmkToDelete(id);
        setOpenConfirmation(true);
    };

    const toggleDataPJ = (smk: any) => {
        if(openDataPJ) {
            setSmkToSeePJ({
                id: null,
                name: null,
            });
            setopenDataPJ(false);
        } else {
            setSmkToSeePJ({
                id: smk.id,
                name: smk.name,
            });
            setopenDataPJ(true);
        }
    }

    const toggleDataMahasiswa = (smk: any) => {
        if(openDataMahasiswa) {
            setSmkToSeeMahasiswa({
                id: null,
                name: null,
            });
            setopenDataMahasiswa(false);
        } else {
            setSmkToSeeMahasiswa({
                id: smk.id,
                name: smk.name,
            });
            setopenDataMahasiswa(true);
        }
    }

    const handleSubmit = (newSmk: Smk) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setErrorMessage("");
        if (smkToEdit) {
            router.patch(`/smk/${newSmk.id}`, newSmk as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setSmkToEdit(null);
                    setOpenModal(false);
                    router.reload({only: ['smks']});
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal menupdate SMK:", errors);
                    setErrorMessage(
                        errors.email ??
                        errors.password ??
                        errors.name ??
                        "" // default empty string
                    );
                }
            });
        } else {
            router.post(`/smk`, newSmk as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setSmkToEdit(null);
                    setOpenModal(false);
                    router.reload();
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal membuat SMK:", errors);
                    setErrorMessage(
                        errors.email ??
                        errors.password ??
                        errors.name ??
                        "" // default empty string
                    );
                }
            });
        }
    };

    useEffect(() => {
        if (flash.success) {
            setFeedback({
                status: "success",
                title: "Pembaruan database berhasil!",
                message: flash.success
            })
        }
        if (flash.error) {
            setFeedback({
                status: "error",
                title: "Pembaruan database gagal!",
                message: flash.error
            })
        }
    }, [flash]);

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
                <Head title="Input Data SMK"/>
                <h2 className="text-xl font-bold mb-4">Data SMK</h2>
                <div className="p-4 border rounded-lg bg-white shadow-md">
                    <div className="mb-4 flex justify-between items-center ">
                        <Button onClick={handleAdd}>+ Tambah SMK</Button>
                        {/*<Button onClick={() => {console.log(smks)}}>DEBUG</Button>*/}
                    </div>
                    {
                        feedback.status === "success" &&
                        <Alert color={"success"} className="mb-4" onDismiss={() => setFeedback({
                            status: "",
                            title: "",
                            message: "",
                        })}>
                            <span className="font-medium">{feedback.title}</span> {feedback.message}
                        </Alert>
                    }

                    <Table striped hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Nama sekolah</TableHeadCell>
                                <TableHeadCell className="text-center">Mahasiswa Terdaftar</TableHeadCell>
                                <TableHeadCell className="text-center">Total PJ</TableHeadCell>
                                <TableHeadCell className="text-center">Data</TableHeadCell>
                                <TableHeadCell className="text-center">Aksi</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {sortedSmkList.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Belum ada data sekolah
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedSmkList.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.name}</TableCell>
                                        <TableCell className="text-center">{s.pendaftaran_plps_count}</TableCell>
                                        <TableCell className="text-center">{s.penanggung_jawabs_count}</TableCell>
                                        <TableCell>
                                            <div className="m-auto flex gap-2 justify-center">
                                                <Button size="xs" className="bg-gray-100 hover:bg-gray-300" onClick={() => toggleDataPJ(s)}>
                                                    <HiUserGroup className="w-4 h-4 text-gray-600"/> <span className="m-3 text-gray-600">Lihat Penanggung Jawab</span>
                                                </Button>
                                                <Button size="xs" className="bg-gray-100 hover:bg-gray-300" onClick={() => toggleDataMahasiswa(s)}>
                                                    <HiAcademicCap className="w-4 h-4 text-gray-600"/> <span className="m-3 text-gray-600">Lihat Mahasiswa Terdaftar</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button size="xs" className="bg-blue-100 hover:bg-blue-300" onClick={() => handleEdit(s)}>
                                                <HiPencil className="w-4 h-4 text-blue-600"/>
                                            </Button>
                                            <Button size="xs" className="bg-red-100 hover:bg-red-300" onClick={() => handleDeleteRequest(s.id)}>
                                                <HiTrash className="w-4 h-4 text-red-600"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <AddUpdateSmk
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setSmkToEdit(null);
                        setErrorMessage("");
                    }}
                    onSubmit={handleSubmit}
                    akunToEdit={smkToEdit}
                    errorMessage={errorMessage}
                    onProcess={processing}
                />
                <InputDataPJ
                    open={openDataPJ}
                    onClose={() => {
                        setopenDataPJ(false);
                    }}
                    smk={smkToSeePJ!}

                />
                <DataMahasiswaPLP
                    open={openDataMahasiswa}
                    onClose={() => {
                        setopenDataMahasiswa(false);
                    }}
                    smk={smkToSeeMahasiswa!}
                />


                <ConfirmationModal
                    open={openConfirmation}
                    onClose={() => {
                        setOpenConfirmation(false);
                        setSmkToDelete(null)
                    }}
                    title={"Apakah anda yakin ingin menghapus sekolah ini?"}
                    onSubmit={() => {
                        handleDelete(smkToDelete!)
                    }}
                    onProcess={processing}

                />
            </div>
        </div>
    );
};

export default InputSmk;
