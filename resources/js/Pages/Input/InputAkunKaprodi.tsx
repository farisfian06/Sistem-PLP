import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeadCell, Alert,
} from "flowbite-react";
import {HiPencil, HiTrash} from "react-icons/hi";
import React, {useEffect, useState} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateAkunDosen from "@/Components/AddUpdateAkunDosen";
import {FlashProps, NewEditUser, User} from "@/types/types";
import {Head, router, useForm, usePage} from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import AddUpdateAkunKaprodi from "@/Components/AddUpdateAkunKaprodi";

const InputAkunAkademik = () => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const users = Array.isArray(props.users) ? props.users : [];

    const [openModal, setOpenModal] = useState(false);
    const [akunToEdit, setAkunToEdit] = useState<NewEditUser | null>(null);
    const [akunToDelete, setAkunToDelete] = useState<number | null>(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })
    const [errorMessage, setErrorMessage] = useState("")

    const handleAdd = () => {
        setAkunToEdit(null);
        setOpenModal(true);
    };

    const handleEdit = (akun: NewEditUser) => {
        setAkunToEdit(akun);
        setOpenModal(true);
    };

    const handleDelete = (id: number) => {
        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        router.delete(`/akun/${id}`, {
            onSuccess: () => {
                setProcessing(false);
                setAkunToDelete(null);
                setOpenConfirmation(false);
                router.reload({only: ['users']});
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const handleDeleteRequest = (id: number) => {
        setAkunToDelete(id);
        setOpenConfirmation(true);
    };


    const handleSubmit = (newAkun: NewEditUser) => {

        setProcessing(true);
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
        setErrorMessage("");
        if (akunToEdit) {
            router.patch(`/akun/${newAkun.id}`, newAkun as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setAkunToEdit(null);
                    setOpenModal(false);
                    router.reload({only: ['users']});
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal menupdate akun:", errors);
                    setErrorMessage(
                        errors.email ??
                        errors.password ??
                        errors.name ??
                        "" // default empty string
                    );
                }
            });
        } else {
            router.post(`/akun`, newAkun as Record<string, any>,{
                onSuccess: () => {
                    setProcessing(false);
                    setAkunToEdit(null);
                    setOpenModal(false);
                    router.reload();
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal membuat akun:", errors);
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

    const columns = [
        {label: "Nama", key: "name"},
        {label: "NIP", key: "nip", group: "details"},
        {label: "No HP", key: "phone", group: "details"},
        {label: "Email", key: "email"},
    ];

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
                <Head title="Input Akun Kaprodi"/>
                <h2 className="text-xl font-bold mb-4">Akun Kaprodi</h2>
                <div className="p-4 border rounded-lg bg-white shadow-md">
                    <div className="mb-4 flex justify-between items-center">
                        <Button onClick={handleAdd}>+ Tambah Akun</Button>
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
                    <div className="overflow-x-auto max-w-full">
                        <Table striped hoverable className="overflow-x-auto">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHeadCell key={column.key} className="w-full sm:w-1/6 md:w-1/6">
                                            {column.label}
                                        </TableHeadCell>
                                    ))}
                                    <TableHeadCell
                                        className="w-full sm:w-1/6 md:w-1/6 justify-center text-center">Aksi</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} className="text-center">
                                            Belum ada data akun kaprodi
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.slice().reverse().map((akun) => (
                                        <TableRow key={akun.id}>
                                            {columns.map((column) => (
                                                <TableCell key={column.key}>
                                                    {
                                                        column.group === "details"
                                                            ? (() => {
                                                                    try {
                                                                        const details = JSON.parse(akun[column.group as keyof NewEditUser].toString())[column.key as keyof NewEditUser]
                                                                        return details;
                                                                    } catch (e) {
                                                                        return "";
                                                                    }
                                                                }
                                                            )()
                                                            : (akun[column.key as keyof NewEditUser])
                                                    }
                                                </TableCell>
                                            ))}
                                            <TableCell className="flex justify-center gap-2">
                                                <Button size="xs" onClick={() => handleEdit(akun)}
                                                        className="bg-blue-100 hover:bg-blue-300">
                                                    <HiPencil className="w-4 h-4 text-blue-600"/>
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    onClick={() => {
                                                        handleDeleteRequest(akun.id)
                                                    }}
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
                    <AddUpdateAkunKaprodi
                        open={openModal}
                        onClose={() => {
                            setOpenModal(false);
                            setAkunToEdit(null);
                            setErrorMessage("");
                        }}
                        onSubmit={handleSubmit}
                        akunToEdit={akunToEdit}
                        errorMessage={errorMessage}
                        onProcess={processing}
                    />

                    <ConfirmationModal
                        open={openConfirmation}
                        onClose={() => {
                            setOpenConfirmation(false);
                            setAkunToDelete(null)
                        }}
                        title={"Apakah anda yakin ingin menghapus akun ini?"}
                        onSubmit={() => {
                            handleDelete(akunToDelete!)
                        }}
                        onProcess={processing}

                    />
                </div>
            </div>
        </div>
    );
};

export default InputAkunAkademik;
