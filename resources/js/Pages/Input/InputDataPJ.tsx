import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeadCell,
    Modal,
    ModalHeader, ModalBody, ModalFooter, Alert
} from "flowbite-react";
import {HiPencil, HiTrash} from "react-icons/hi";
import React, {useEffect, useState} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateAkunPJ from "@/Components/AddUpdateAkunPJ";
import {AkunPJ, FlashProps} from "@/types/types";
import {Head, router, usePage} from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";

interface DataPJProps {
    open: boolean;
    onClose: () => void;
    smk: any;
}

const InputDataPJ: React.FC<DataPJProps> = ({
                                           open,
                                           onClose,
                                           smk,
                                       }) => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const penanggungJawabs = Array.isArray(props.penanggungJawabs) ? props.penanggungJawabs : [];

    const [akunPJ, setAkunPJ] = useState<AkunPJ[]>([]);
    const [openThisModal, setOpenThisModal] = useState(open);
    const [openModal, setOpenModal] = useState(false);
    const [akunToEdit, setAkunToEdit] = useState<AkunPJ | null>(null);
    const [akunToDelete, setAkunToDelete] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        setOpenThisModal(open);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
    }, [open]);

    useEffect(() => {
        if(smk.id) {
            setFetching(true);
            router.get(`/smk/penanggung-jawab/${smk.id}`, {}, {
                preserveState: true,
                replace: false,
                onSuccess: () => {
                    setFetching(false);
                },
                onError: (errors) => {
                    console.error("Gagal mengambil data SMK:", errors);
                    setFetching(false);
                },
                only: ['penanggungJawabs']
            });
        }
    }, [smk.id]);

    const handleAdd = () => {
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setAkunToEdit(null); // Buat mode tambah
        setOpenModal(true);
        setOpenThisModal(false);
    };

    const handleEdit = (akun: AkunPJ) => {
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setAkunToEdit(akun);
        setOpenModal(true);
        setOpenThisModal(false);
        console.log("EDITED")
    };

    const handleDelete = (id: number) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        router.delete(`/smk/penanggung-jawab/${id}`, {
            onSuccess: () => {
                setOpenThisModal(true)
                setProcessing(false);
                setAkunToDelete(null);
                setOpenConfirmation(false);
                setFeedback({
                    status: "success",
                    title: "Pembaruan database berhasil!",
                    message: "Data penanggung jawab telah berhasil dihapus",
                })
                router.reload({only: ['smks']});
            },
            onError: (errors) => {
                setProcessing(false);
                setFeedback({
                    status: "error",
                    title: "Pembaruan database gagal",
                    message: errors.toString(),
                })
            }
        });
    };

    const handleDeleteRequest = (id: number) => {
        setAkunToDelete(id);
        setOpenThisModal(false)
        setOpenConfirmation(true);
    };

    const handleSubmit = (newAkun: AkunPJ) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setErrorMessage("");
        if (akunToEdit) {
            router.patch(`/smk/penanggung-jawab/${newAkun.id}`, newAkun as Record<string, any>, {
                only: ['penanggungJawabs'],
                onSuccess: () => {
                    setProcessing(false);
                    setOpenThisModal(true)
                    setAkunToEdit(null);
                    setOpenModal(false);
                    setFeedback({
                        status: "success",
                        title: "Pembaruan database berhasil!",
                        message: "Data penanggung jawab telah berhasil diperbarui",
                    })
                    router.reload({only: ['penanggungJawabs']});
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal menupdate SMK:", errors);
                    setFeedback({
                        status: "error",
                        title: "Pembaruan database gagal",
                        message: errors.toString(),
                    })
                    router.reload({only: ['penanggungJawabs']});
                }
            });
        } else {
            console.log(newAkun);
            router.post(`/smk/penanggung-jawab`, newAkun as Record<string, any>, {
                only: ['penanggungJawabs'],
                onSuccess: () => {
                    setProcessing(false);
                    setAkunToEdit(null);
                    setOpenThisModal(true)
                    setOpenModal(false);
                    setFeedback({
                        status: "success",
                        title: "Pembaruan database berhasil!",
                        message: "Data penanggung jawab baru telah berhasil dimasukkan",
                    })
                    // router.reload();
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal membuat penanggung jawab:", errors);
                    setFeedback({
                        status: "error",
                        title: "Pembaruan database gagal",
                        message: errors.toString(),
                    })
                }
            });
        }
    };

    // const akunPJSorted = [...akunPJ].sort((a, b) =>
    //     a.smk_id.localeCompare(b.smk_id, "id", {numeric: true})
    // );

    const columns = [
        {label: "Nama", key: "nama"},
        {label: "NIP/NIK", key: "nip"},
        {label: "Status", key: "status"},
        {label: "No HP", key: "notel"},
        {label: "Pangkat Golongan", key: "pangkat"},
        {label: "No Rekening", key: "norek"},
        {label: "An Rekening", key: "norek_an"},
        {label: "Nama Bank", key: "nama_bank"},
    ];

    return (
        <>
            <Modal show={openThisModal} onClose={onClose} size="7xl">
                <ModalHeader>
                    Penanggung Jawab {smk.name}
                </ModalHeader>
                <ModalBody>
                    {
                        feedback.status &&
                        <Alert color={feedback.status === "success" ? "success" : "failure"} className="mb-4" onDismiss={() => setFeedback({
                            status: "",
                            title: "",
                            message: "",
                        })}>
                            <span className="font-medium">{feedback.title}</span> {feedback.message}
                        </Alert>
                    }
                    <div className="mb-4 flex justify-between items-center">
                        <Button onClick={handleAdd}>+ Tambah Data</Button>
                        {/*<Button onClick={() => {*/}
                        {/*    console.log(props);*/}
                        {/*}}>Debug</Button>*/}
                    </div>
                    <div className="overflow-x-auto max-w-full">
                        <Table striped hoverable className="overflow-x-auto">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHeadCell key={column.key} className="w-full sm:w-1/6 md:w-1/6">
                                            {column.label}
                                        </TableHeadCell>
                                    ))}
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6 text-center">Aksi</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {fetching ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} className="text-center">
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : penanggungJawabs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} className="text-center">
                                            Belum ada data akun PJ
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    penanggungJawabs.map((akun) => (
                                        <TableRow key={akun.id}>
                                            {columns.map((column) => (
                                                <TableCell key={column.key} className="truncate">
                                                    {akun[column.key]}
                                                </TableCell>
                                            ))}
                                            <TableCell className="flex justify-center gap-2">
                                                <Button
                                                    size="xs"
                                                    onClick={() => handleEdit(akun)}
                                                    className="bg-blue-100 hover:bg-blue-300"
                                                >
                                                    <HiPencil className="w-4 h-4 text-blue-600"/>
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    onClick={() => handleDeleteRequest(akun.id)}
                                                    className="bg-red-100 hover:bg-red-300"
                                                >
                                                    <HiTrash className="w-4 h-4 text-red-600"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
            <AddUpdateAkunPJ
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setOpenThisModal(true);
                }}
                onSubmit={handleSubmit}
                akunToEdit={akunToEdit}
                smk={smk.id}
                onProcess={processing}
            />

            <ConfirmationModal
                open={openConfirmation}
                onClose={() => {
                    setOpenConfirmation(false);
                    setAkunToEdit(null)
                }}
                title={"Apakah anda yakin ingin menghapus penanggung jawab ini?"}
                onSubmit={() => {
                    handleDelete(akunToDelete!)
                }}
                onProcess={processing}

            />
        </>

    );
};

export default InputDataPJ;
