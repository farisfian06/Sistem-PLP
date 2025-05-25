import {Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Badge, Alert} from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import React, {useEffect, useState} from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AddUpdateLogbook from "@/Components/AddUpdateLogbook";
import SidebarComponent from "@/Components/SidebarComponent";
import {FlashProps, Logbook} from "@/types/types";
import ConfirmationModal from "@/Components/ConfirmationModal";

const Logbooks = () => {
    const { props } = usePage();
    const {flash} = usePage<FlashProps>().props;
    const logbooks: Logbook[] = Array.isArray(props.logbooks) ? props.logbooks : [];

    const [showAddUpdateLogbook, setShowAddUpdateLogbook] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [logbookToEdit, setLogbookToEdit] = useState<Logbook | null>(null);
    const [logbookToDelete, setLogbookToDelete] = useState<number | null>(null);
    const [processing, setProcessing] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })

    // Fungsi hapus logbook berdasarkan ID
    const handleLogbookDelete = (id: number) => {
        setProcessing(true)
        resetFeedback();
        router.delete(`/logbooks/${id}`, {
            onSuccess: () => {
                setProcessing(false);
                router.reload({only: ["logbooks"]});
                setOpenConfirmation(false);
                setLogbookToDelete(null);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const resetFeedback = () => {
        setFeedback({
            status: "",
            title: "",
            message: ""
        })
    };
    const handleDeleteRequest = (id: number) => {
        setLogbookToDelete(id);
        setOpenConfirmation(true);
    };

    useEffect(() => {
        if (flash.success) {
            setFeedback({
                status: "success",
                title: "Pembaruan data berhasil!",
                message: flash.success
            })
        }
        if (flash.error) {
            setFeedback({
                status: "error",
                title: "Pembaruan data gagal!",
                message: flash.error
            })
        }
    }, [flash]);

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarComponent />
            <div className="flex-1 p-6 lg:ml-64 mt-16">
                <Head title="Logbook" />
                <h1 className="text-xl font-bold">Logbook</h1>
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
                <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                    <div className="mb-4 flex justify-between">
                        <Button
                            onClick={() => {
                                setLogbookToEdit(null);
                                setShowAddUpdateLogbook(true);
                            }}
                        >
                            Tambah Logbook
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Tanggal Kegiatan</TableHeadCell>
                                    <TableHeadCell>Uraian Kegiatan</TableHeadCell>
                                    <TableHeadCell>Waktu Mulai</TableHeadCell>
                                    <TableHeadCell>Waktu Selesai</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>Actions</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {logbooks.length > 0 ? (
                                    logbooks.map((item) => (
                                        <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell>{item.tanggal}</TableCell>
                                            <TableCell>{item.keterangan}</TableCell>
                                            <TableCell>{item.mulai}</TableCell>
                                            <TableCell>{item.selesai}</TableCell>
                                            <TableCell><Badge color={
                                                item.status === "approved" ? "success" :
                                                    item.status === "rejected" ? "failure" :
                                                        "gray"
                                            } className="w-fit">{item.status!.charAt(0).toUpperCase() + item.status!.slice(1)}</Badge></TableCell>
                                            <TableCell className="flex space-x-2">
                                                <Button disabled={item.status !== "pending"} size="xs" className={item.status === "pending" ? "bg-blue-100 hover:bg-blue-300" :  "bg-gray-200"} onClick={() => {
                                                    setLogbookToEdit(item);
                                                    setShowAddUpdateLogbook(true);
                                                }}>
                                                    <HiPencil className={`w-4 h-4 text-${item.status === "pending" ? "blue" : "gray"}-600`}/>
                                                </Button>
                                                <Button size="xs" className="bg-red-100 hover:bg-red-300" onClick={() => {
                                                    handleDeleteRequest(item.id);
                                                }}>
                                                    <HiTrash className="w-4 h-4 text-red-600"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Belum ada logbook
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {/* modal untuk tambah/edit logbook */}
                    <AddUpdateLogbook
                        open={showAddUpdateLogbook}
                        onClose={() => setShowAddUpdateLogbook(false)}
                        onSubmit={resetFeedback}
                        logbookToEdit={logbookToEdit}
                        onLogbookAdded={() => router.reload({ only: ["logbooks"] })}
                        onLogbookUpdated={() => router.reload({ only: ["logbooks"] })}
                    />
                    <ConfirmationModal
                        open={openConfirmation}
                        onClose={() => {
                            setOpenConfirmation(false);
                            setLogbookToDelete(null)
                        }}
                        title={"Apakah anda yakin ingin menghapus logbook ini?"}
                        onSubmit={() => {
                            handleLogbookDelete(logbookToDelete!)
                        }}
                        onProcess={processing}

                    />
                </div>
            </div>

        </div>
    );
};

export default Logbooks;
