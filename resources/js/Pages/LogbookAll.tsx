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

    const fetchedLogbooks = Array.isArray(props.logbooks)
        ? props.logbooks.map(logbook => ({
            ...logbook
        }))
        : [];

    useEffect(() => {
        console.log(fetchedLogbooks)
    }, []);

    const [logbooks, setLogbooks] = useState(fetchedLogbooks);

    return (
        <div className="flex flex-col lg:flex-row">
            <Head title="Logbook Mahasiswa"/>
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16">
                <h1 className="text-xl font-bold">Logbook Mahasiswa</h1>
                <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">

                    {/* Tabel Logbook */}
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
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
                                            <TableCell>{item.user.name}</TableCell>
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
                                        <TableCell colSpan={9} className="text-center">
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
