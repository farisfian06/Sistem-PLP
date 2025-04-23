import React, {useState, useMemo, useEffect} from "react";
import {Head, router, usePage} from "@inertiajs/react";
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Alert} from "flowbite-react";
import {HiPencil, HiTrash} from "react-icons/hi";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateKeminatan from "@/Components/AddUpdateKeminatan";
import {FlashProps, Keminatan, Smk} from "@/types/types";
import ConfirmationModal from "@/Components/ConfirmationModal";
import AddUpdateSmk from "@/Components/AddUpdateSmk";

const InputKeminatan = () => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const keminatans = Array.isArray(props.keminatans) ? props.keminatans : [];

    const [openModal, setOpenModal] = useState(false);
    const [keminatanToEdit, setKeminatanToEdit] = useState<Keminatan | null>(null);
    const [keminatanToDelete, setKeminatanToDelete] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })
    const [errorMessage, setErrorMessage] = useState("")


    const handleAdd = () => {
        setKeminatanToEdit(null);
        setOpenModal(true);
    };

    const handleEdit = (Keminatan: Keminatan) => {
        setKeminatanToEdit(Keminatan);
        setOpenModal(true);
    };

    const handleDelete = (id: number) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        router.delete(`/keminatan/${id}`, {
            onSuccess: () => {
                setProcessing(false);
                setKeminatanToDelete(null);
                setOpenConfirmation(false);
                router.reload({only: ['keminatans']});
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const handleDeleteRequest = (id: number) => {
        setKeminatanToDelete(id);
        setOpenConfirmation(true);
    };

    const handleSubmit = (newSmk: Smk) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setErrorMessage("");
        if (keminatanToEdit) {
            router.patch(`/keminatan/${newSmk.id}`, newSmk as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setKeminatanToEdit(null);
                    setOpenModal(false);
                    router.reload({only: ['smks']});
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal menupdate keminatan:", errors);
                    setErrorMessage(
                        errors.email ??
                        errors.password ??
                        errors.name ??
                        "" // default empty string
                    );
                }
            });
        } else {
            router.post(`/keminatan`, newSmk as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setKeminatanToEdit(null);
                    setOpenModal(false);
                    router.reload();
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal membuat keminatan:", errors);
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
                <Head title="Input Data Keminatan"/>
                <h2 className="text-xl font-bold mb-4">Data Keminatan</h2>
                <div className="p-4 border rounded-lg bg-white shadow-md">
                    <div className="mb-4 flex justify-between items-center ">
                        <Button onClick={handleAdd}>+ Tambah Keminatan</Button>
                    </div>
                    {
                        feedback.status &&
                        <Alert color={feedback.status === "error" ? "failure" : "success"} className="mb-4" onDismiss={() => setFeedback({
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
                                <TableHeadCell className="text-center">Nama Keminatan</TableHeadCell>
                                <TableHeadCell className="text-center">Aksi</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="text-center">
                            {keminatans.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center">
                                        Belum ada data Keminatan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                keminatans.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.name}</TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button size="xs" className="bg-blue-100" onClick={() => handleEdit(s)}>
                                                <HiPencil className="w-4 h-4 text-blue-600"/>
                                            </Button>
                                            <Button size="xs" className="bg-red-100" onClick={() => handleDeleteRequest(s.id)}>
                                                <HiTrash className="w-4 h-4 text-red-600"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <AddUpdateKeminatan
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setKeminatanToEdit(null);
                        setErrorMessage("");
                    }}
                    onSubmit={handleSubmit}
                    akunToEdit={keminatanToEdit}
                    errorMessage={errorMessage}
                    onProcess={processing}
                />

                <ConfirmationModal
                    open={openConfirmation}
                    onClose={() => {
                        setOpenConfirmation(false);
                        setKeminatanToDelete(null)
                    }}
                    title={"Apakah anda yakin ingin menghapus keminatan ini?"}
                    onSubmit={() => {
                        handleDelete(keminatanToDelete!)
                    }}
                    onProcess={processing}

                />
            </div>
        </div>
    );
};

export default InputKeminatan;
