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

const DataMahasiswaPLP: React.FC<DataPJProps> = ({
                                                     open,
                                                     onClose,
                                                     smk,
                                                 }) => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const pendaftaranPlps = Array.isArray(props.pendaftaranPlps) ? props.pendaftaranPlps : [];

    const [openThisModal, setOpenThisModal] = useState(open);
    const [fetching, setFetching] = useState(false);
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
        if (smk.id) {
            setFetching(true);
            router.get(`/smk/mahasiswa/${smk.id}`, {}, {
                preserveState: true,
                replace: false,
                onSuccess: () => {
                    setFetching(false);
                },
                onError: (errors) => {
                    console.error("Gagal mengambil data SMK:", errors);
                    setFetching(false);
                },
                only: ['pendaftaranPlps']
            });
        }
    }, [smk.id]);

    return (
        <>
            <Modal show={openThisModal} onClose={onClose} size="7xl">
                <ModalHeader>
                    Mahasiswa terdaftar PLP di {smk.name}
                </ModalHeader>
                <ModalBody>
                    {
                        feedback.status &&
                        <Alert color={feedback.status === "success" ? "success" : "failure"} className="mb-4"
                               onDismiss={() => setFeedback({
                                   status: "",
                                   title: "",
                                   message: "",
                               })}>
                            <span className="font-medium">{feedback.title}</span> {feedback.message}
                        </Alert>
                    }
                    {/*<div className="mb-4 flex justify-between items-center">*/}
                    {/*    <Button onClick={() => {*/}
                    {/*        console.log(props);*/}
                    {/*    }}>Debug</Button>*/}
                    {/*</div>*/}
                    <div className="overflow-x-auto max-w-full">
                        <Table striped hoverable className="overflow-x-auto">
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Nama</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">NIM</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Email</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Angkatan</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Guru Pamong</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {fetching ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : pendaftaranPlps.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Belum ada data mahasiswa terdaftar
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pendaftaranPlps.map((akun) => (
                                        <TableRow key={akun.user.id}>
                                            <TableCell className="truncate">{akun.user.name}</TableCell>
                                            <TableCell
                                                className="truncate">{JSON.parse(akun.user.details).nim}</TableCell>
                                            <TableCell className="truncate">{akun.user.email}</TableCell>
                                            <TableCell
                                                className="truncate">{JSON.parse(akun.user.details).angkatan}</TableCell>
                                            <TableCell
                                                className="truncate">{akun.user.mahasiswa_pamong ? akun.user.mahasiswa_pamong.name : "-"}</TableCell>
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

        </>

    );
};

export default DataMahasiswaPLP;
