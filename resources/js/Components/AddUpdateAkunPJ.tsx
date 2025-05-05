import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import {useEffect, useState} from "react";
import {AkunPJ} from "@/types/types"

interface AddUpdateAkunPJProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (akun: AkunPJ) => void;
    akunToEdit: AkunPJ | null;
    smk: number;
    onProcess: boolean;
}

const AddUpdateAkunPJ: React.FC<AddUpdateAkunPJProps> = ({
                                                             open,
                                                             onClose,
                                                             onSubmit,
                                                             akunToEdit,
                                                             smk,
                                                             onProcess
                                                         }) => {
    const [form, setForm] = useState<AkunPJ>({
        id: akunToEdit?.id || 0,
        nama: akunToEdit?.nama || "",
        nip: akunToEdit?.nip || "",
        notel: akunToEdit?.notel || "",
        status: akunToEdit?.status || "",
        pangkat: akunToEdit?.pangkat || "",
        norek: akunToEdit?.norek || "",
        norek_an: akunToEdit?.norek_an || "",
        nama_bank: akunToEdit?.nama_bank || "",
        smk_id: smk,
    });

    useEffect(() => {
        if (akunToEdit) {
            setForm(akunToEdit);
        } else {
            emptyForm();
        }
    }, [akunToEdit]);


    const emptyForm = () => {
        setForm({
            id: Date.now(),
            nama: "",
            nip: "",
            notel: "",
            status: "",
            pangkat: "",
            norek: "",
            norek_an: "",
            nama_bank: "",
            smk_id: smk,
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (!open) emptyForm();
    }, [open]);

    useEffect(() => {
        setForm({...form, smk_id: smk});
    }, [smk]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <Modal show={open} size="lg" onClose={onClose} popup>
            <ModalHeader/>
            <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {akunToEdit ? "Edit Akun PJ" : "Tambah Akun PJ"}
                    </h3>
                    {[
                        {name: "nama", label: "Nama"},
                        {name: "nip", label: "NIP/NIK"},
                        {name: "notel", label: "No HP"},
                        {name: "pangkat", label: "Pangkat Golongan"},
                        {name: "norek", label: "No Rekening"},
                        {name: "norek_an", label: "An Rekening"},
                        {name: "nama_bank", label: "Nama Bank"},
                    ].map(({name, label}) => (
                        <div key={name}>
                            <Label htmlFor={name}>{label}</Label>
                            <TextInput
                                id={name}
                                name={name}
                                value={form[name as keyof AkunPJ] || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 p-2"
                        >
                            <option value="">-- Pilih Status --</option>
                            <option value="Kepala Sekolah / Penanggung Jawab">
                                Kepala Sekolah / Penanggung Jawab
                            </option>
                            <option value="Koordinator PLP dari SMK">
                                Koordinator PLP dari SMK
                            </option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button color="gray" onClick={onClose}>
                            Batal
                        </Button>
                        <Button onClick={handleSubmit}
                                disabled={onProcess}>{onProcess ? "Menyimpan..." : "Simpan"}</Button>
                        {/*<Button type="button" onClick={() => {*/}
                        {/*    console.log(smk)*/}
                        {/*}}>DEBUG</Button>*/}
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default AddUpdateAkunPJ;
