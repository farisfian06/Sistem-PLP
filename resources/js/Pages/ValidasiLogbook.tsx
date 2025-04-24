import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeadCell,
    Select,
    Checkbox,
    Badge, Alert
} from "flowbite-react";
import React, {useEffect, useRef, useState} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import {Head, router, usePage, useForm, Link} from "@inertiajs/react";
import {FlashProps, Logbook} from "@/types/types";


const ValidasiLogbook = () => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const fetchedLogbooks = Array.isArray(props.logbooks)
        ? props.logbooks.map(logbook => ({
            ...logbook,
            checked: false // Default all to unchecked
        }))
        : [];


    const [logbooks, setLogbooks] = useState(fetchedLogbooks);
    const [validasiStatus, setValidasiStatus] = useState(""); // Pilihan validasi default
    const [selectAll, setSelectAll] = useState(false); // Menyimpan status select all
    const selectRef = useRef<HTMLSelectElement>(null);
    const [processing, setProcessing] = useState(false);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })

    const [logbooksToSubmit, setLogbooksToSubmit] = useState<any>({
        logbooks: []
    });

    // Fungsi untuk mengubah status logbook
    const handleStatusChange = (id: number, newStatus: string) => {
        setLogbooks((prevLogbooks) =>
            prevLogbooks.map((log) =>
                log.id === id ? {...log, status: newStatus} : log
            )
        );
    };

    // Fungsi untuk menangani perubahan checkbox
    const handleCheckboxChange = (id: number) => {
        setLogbooks((prevLogbooks) =>
            prevLogbooks.map((log) =>
                log.id === id ? {...log, checked: !log.checked} : log
            )
        );
    };

    // Fungsi untuk memvalidasi logbook terpilih
    const handleValidasi = () => {
        if (validasiStatus === "") {
            selectRef.current?.focus();
            return;
        }

        setFeedback({
            status: "",
            title: "",
            message: ""
        })

        // memilih logbook yang tercentang saja
        const selectedLogbooks = logbooks.filter(log => log.checked).map(log => ({
            id: log.id,
            status: validasiStatus,
        }));
        setLogbooksToSubmit({logbooks: selectedLogbooks});

        setSelectAll(false);

    };

    // patch logbook setelah submit
    useEffect(() => {
        if (logbooksToSubmit.logbooks.length !== 0) {
            setProcessing(true);
            router.patch(`/logbooks/validasi`, logbooksToSubmit as Record<string, any>, {
                onSuccess: () => {
                    setLogbooksToSubmit({
                        logbooks: []
                    })
                    setProcessing(false);
                    router.reload({only: ['logbooks']});
                },
                onError: (errors) => {
                    setProcessing(false);
                    console.error("Gagal menupdate keminatan:", errors);
                }
            });
        }
    }, [logbooksToSubmit]);

    // update tampilan data logbook setelah patch
    useEffect(() => {
        const fetchedLogbooks = Array.isArray(props.logbooks)
            ? props.logbooks.map(logbook => ({
                ...logbook,
                checked: false
            }))
            : [];
        setLogbooks(fetchedLogbooks);
    }, [props.logbooks]);

    // Fungsi untuk menangani perubahan pada checkbox "Select All"
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setLogbooks((prevLogbooks) =>
            prevLogbooks.map((log) => (
                log.status === "pending" ? {...log, checked: !selectAll} : {...log}
            )))
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
            <Head title="Validasi Logbook"/>
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16">
                <h1 className="text-xl font-bold">Validasi Logbook</h1>
                <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">

                    {
                        feedback.status &&
                        <Alert color={feedback.status === "error" ? "failure" : "success"} className="mb-4"
                               onDismiss={() => setFeedback({
                                   status: "",
                                   title: "",
                                   message: "",
                               })}>
                            <span className="font-medium">{feedback.title}</span> {feedback.message}
                        </Alert>
                    }

                    {/* pilihan validasi & tombol validasi */}
                    <div className="mb-4 flex justify-between">
                        <Select
                            value={validasiStatus}
                            onChange={(e) => setValidasiStatus(e.target.value)}
                            className="min-w-40"
                            ref={selectRef}
                        >
                            <option value="" disabled hidden>Pilih status</option>
                            <option value="approved">Setujui</option>
                            <option value="rejected">Tolak</option>
                        </Select>
                        <Button onClick={handleValidasi}
                                disabled={processing}>{processing ? "Memvalidasi..." : "Validasi"}</Button>
                    </div>

                    {/* Tabel Logbook */}
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>
                                        <Checkbox checked={selectAll} onChange={handleSelectAll}/>
                                    </TableHeadCell>
                                    <TableHeadCell>Nama</TableHeadCell>
                                    <TableHeadCell>Uraian Kegiatan</TableHeadCell>
                                    <TableHeadCell>Tanggal Kegiatan</TableHeadCell>
                                    <TableHeadCell>Waktu Mulai</TableHeadCell>
                                    <TableHeadCell>Waktu Selesai</TableHeadCell>
                                    <TableHeadCell>Dokumentasi</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {logbooks.length > 0 ? (
                                    logbooks.map((item) => (
                                        <TableRow key={item.id}
                                                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell>
                                                <Checkbox checked={item.checked}
                                                          onChange={() => handleCheckboxChange(item.id)}/>
                                            </TableCell>
                                            <TableCell>{item.user}</TableCell>
                                            <TableCell>{item.keterangan}</TableCell>
                                            <TableCell>{item.tanggal}</TableCell>
                                            <TableCell>{item.mulai}</TableCell>
                                            <TableCell>{item.selesai}</TableCell>
                                            <TableCell><a href={item.dokumentasi} target="_blank" className="text-blue-500 underline">Lihat</a></TableCell>
                                            <TableCell><Badge color={
                                                item.status === "approved" ? "success" :
                                                    item.status === "rejected" ? "failure" :
                                                        "gray"
                                            }
                                                              className="w-fit">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Badge></TableCell>
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
                </div>
            </div>
        </div>
    );
};

export default ValidasiLogbook;
