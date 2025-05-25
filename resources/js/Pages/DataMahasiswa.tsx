import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeadCell, Alert, Badge,
} from "flowbite-react";
import {HiPencil, HiTrash} from "react-icons/hi";
import React, {useEffect, useState} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateAkunDosen from "@/Components/AddUpdateAkunDosen";
import {FlashProps, NewEditUser, User} from "@/types/types";
import {Head, router, useForm, usePage} from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import { generateRandomPassword } from '@/utils/password';

const DataMahasiswa = () => {

    const {props} = usePage();

    const users = Array.isArray(props.users) ? props.users : [];

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
                <Head title="Input Akun Dosen Pembimbing"/>
                <h2 className="text-xl font-bold mb-4">Data Mahasiswa</h2>
                <div className="p-4 border rounded-lg bg-white shadow-md">
                    {/*<div className="mb-4 flex justify-between items-center">*/}
                    {/*    <Button onClick={() => {console.log(users)}}>DEBUG</Button>*/}
                    {/*</div>*/}
                    <div className="overflow-x-auto max-w-full">
                        <Table striped hoverable className="overflow-x-auto">
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Nama</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">NIM</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Email</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Angkatan</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Dosen Pembimbing</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Guru Pamong</TableHeadCell>
                                    <TableHeadCell className="w-full sm:w-1/6 md:w-1/6">Lokasi PLP</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Belum ada data mahasiswa
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="truncate">{user.name}</TableCell>
                                            <TableCell
                                                className="truncate">{JSON.parse(user.details).nim}</TableCell>
                                            <TableCell className="truncate">{user.email}</TableCell>
                                            <TableCell
                                                className="truncate">{JSON.parse(user.details).angkatan}</TableCell>
                                            <TableCell
                                                className="truncate">{user.mahasiswa_dospem ? user.mahasiswa_dospem.name : "-"}</TableCell>
                                            <TableCell
                                                className="truncate">{user.mahasiswa_pamong ? user.mahasiswa_pamong.name : "-"}</TableCell>
                                            <TableCell
                                                className="truncate">{user.pendaftaran_plp?.penempatan_smk ? user.pendaftaran_plp.penempatan_smk.name : "-"}</TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataMahasiswa;
