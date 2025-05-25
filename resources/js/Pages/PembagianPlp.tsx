import {Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Select, Alert} from "flowbite-react";
import {HiPencil, HiTrash, HiEye, HiCheck, HiExclamationCircle} from "react-icons/hi";
import React, {useEffect, useState} from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import ViewDetailPendaftaranModal from "@/Components/ViewDetailPendaftaranModal";
import {Head, useForm, usePage} from "@inertiajs/react";
import {AssignPendaftaran, FlashProps, SelectOption} from "@/types/types";

interface Pendaftaran {
    [key: string]: any;

    pendaftarans: AssignPendaftaran[];
}


const PembagianPlp = () => {

    const {props} = usePage();
    const {flash} = usePage<FlashProps>().props;

    const pendaftaranPlp = Array.isArray(props.pendaftaranPlp) ? props.pendaftaranPlp : [];
    const dospemData = Array.isArray(props.dospem) ? props.dospem : [];
    const guruData = Array.isArray(props.guru) ? props.guru : [];
    const smkData = Array.isArray(props.smk) ? props.smk : [];

    const {data, setData, post, put, processing, reset, patch} = useForm<Pendaftaran>({
        pendaftarans: []
    });

    const [dataChanged, setDataChanged] = useState(false);
    // const [pendaftaranPlp, setPendaftaranPlp] = useState(pendaftaranPlpData);
    const [viewData, setViewData] = useState<any | null>(null);
    const [changedIds, setChangedIds] = useState<number[]>([]);
    const [feedback, setFeedback] = useState({
        status: "",
        title: "",
        message: "",
    })


    const handleView = (data: any) => {
        setViewData(data);
    };

    const handleCloseView = () => setViewData(null);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setChangedIds(pendaftaranPlp.map((m) => m.id));
        } else {
            setChangedIds([]);
        }
    };

    const handleDataChange = (id: number) => {
        setChangedIds(prev =>
            prev.includes(id) ? prev : [...prev, id]
        );
    };

    const isCheckedAll = pendaftaranPlp.length > 0 && changedIds.length === pendaftaranPlp.length;

    const handleSubmit = () => {

        const selectedMahasiswa = pendaftaranPlp.filter((m) => changedIds.includes(m.id));
        setFeedback({
            status: "",
            title: "",
            message: "",
        })

        const newPendaftaran = selectedMahasiswa.map(pendaftaran => ({
            id: pendaftaran.id,
            penempatan: pendaftaran.penempatan,
            dosen_pembimbing: pendaftaran.dosen_pembimbing,
            guru_pamong: pendaftaran.guru_pamong,
        }));

        setData('pendaftarans', newPendaftaran);
    };

    useEffect(() => {
        if (data.pendaftarans.length !== 0) {
            console.log(data);
            patch(`/pendaftaran-plp`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDataChanged(false);
                    setChangedIds([])
                    setData('pendaftarans', [])
                },
                onError: (errors) => {
                    setDataChanged(false);
                    console.error("Gagal validasi logbook ID");
                }
            });
        }
    }, [data]);

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


    const renderSelect = (value: any, options: SelectOption[], onChange: (value: any) => void) => (
        <Select
            defaultValue={value}
            onChange={(e) => {
                onChange(e.target.value);
                setDataChanged(true);
            }}
            className="w-full max-w-xs mx-auto"
        >
            <option value="">
                -
            </option>
            {options.map((option, index) => (
                <option key={index} value={option.id}>
                    {option.name}
                </option>
            ))}
        </Select>
    );

    return (

        <div className="flex flex-col lg:flex-row">
            <SidebarComponent/>
            <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
                <Head title="Pembagian PLP"/>
                <h2 className="text-xl font-bold mb-4">Pembagian PLP</h2>
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

                <div className="p-4 border rounded-lg bg-white shadow-md">
                    <div className="flex justify-between mb-4">
                        <Button color="blue" onClick={handleSubmit}>
                            Update
                        </Button>
                        {dataChanged &&
                            <span className="flex items-center text-sm gap-1 text-gray-400"><HiExclamationCircle
                                className="text-lg"/>Terdapat perubahan belum disimpan</span>
                        }
                    </div>
                    <Table striped hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>No</TableHeadCell>
                                <TableHeadCell>NIM</TableHeadCell>
                                <TableHeadCell>Nama Mahasiswa</TableHeadCell>
                                <TableHeadCell>Waktu Pendaftaran</TableHeadCell>
                                <TableHeadCell>Penempatan SMK</TableHeadCell>
                                <TableHeadCell>Dosen Pembimbing</TableHeadCell>
                                <TableHeadCell>Guru Pamong</TableHeadCell>
                                <TableHeadCell className="text-center">Aksi</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendaftaranPlp.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Belum ada data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendaftaranPlp.map((mhs, index) => (
                                    <TableRow key={mhs.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{JSON.parse(mhs.user.details).nim}</TableCell>
                                        <TableCell>{mhs.user.name}</TableCell>
                                        <TableCell>{new Date(mhs.created_at).toLocaleString('id-ID', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</TableCell>
                                        <TableCell>{renderSelect(mhs.penempatan, smkData, (value) => {
                                            mhs.penempatan = parseInt(value);
                                            handleDataChange(mhs.id);
                                        })}</TableCell>
                                        <TableCell>{renderSelect(mhs.user.dosen_id, dospemData, (value) => {
                                            mhs.dosen_pembimbing = parseInt(value);
                                            handleDataChange(mhs.id);
                                        })}</TableCell>
                                        <TableCell>{renderSelect(mhs.user.guru_id, guruData, (value) => {
                                            mhs.guru_pamong = parseInt(value);
                                            handleDataChange(mhs.id);
                                        })}</TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button size="xs" onClick={() => handleView(mhs)}
                                                    className="text-gray-600 bg-gray-100 hover:bg-gray-300">
                                                <HiEye className="w-4 h-4"/>
                                            </Button>
                                            {/*<Button size="xs" color="blue" className="bg-blue-100 text-blue-600">*/}
                                            {/*    <HiPencil className="w-4 h-4"/>*/}
                                            {/*</Button>*/}
                                            {/*<Button*/}
                                            {/*    size="xs"*/}
                                            {/*    onClick={() => handleDelete(mhs.id)} className="text-red-600 bg-red-100"*/}
                                            {/*>*/}
                                            {/*    <HiTrash className="w-4 h-4 "/>*/}
                                            {/*</Button>*/}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <ViewDetailPendaftaranModal
                show={!!viewData}
                onClose={handleCloseView}
                data={viewData}
            />
        </div>
    );
};

export default PembagianPlp;
