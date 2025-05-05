import {Modal, Button, Label, TextInput, ModalHeader, ModalBody, ModalFooter} from "flowbite-react";
import {useState, useEffect} from "react";
import {NewEditUser} from "@/types/types";
import {router} from "@inertiajs/react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (akun: NewEditUser) => void;
    akunToEdit: NewEditUser | null;
    errorMessage: string;
    onProcess: boolean;
}

const AddUpdateAkunDosen = ({open, onClose, onSubmit, akunToEdit, errorMessage, onProcess}: Props) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        id: 0,
        name: "",
        details: "",
        email: "",
        role: "Dosen Pembimbing",
        password: "",
    });

    const resetForm = () => {
        setFormData({
            id: 0,
            name: "",
            details: "",
            email: "",
            role: "Dosen Pembimbing",
            password: "",
        });
    };

    useEffect(() => {
        if (akunToEdit) {
            const parsedDetails = typeof akunToEdit.details === 'string'
                ? JSON.parse(akunToEdit.details)
                : akunToEdit.details || {};

            setFormData({
                ...akunToEdit,
                details: parsedDetails
            });
        } else {
            resetForm();
        }
    }, [akunToEdit]);

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, child = "none") => {
        child !== "none" ? setFormData({
            ...formData,
            [e.target.name]: {...formData[e.target.name], [child]: e.target.value}
        }) : setFormData({...formData, [e.target.name]: e.target.value})
        // setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        onSubmit(formData as NewEditUser);
    };

    const inputField = (label: string, name: keyof NewEditUser, child = "none", type = "text") => (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <TextInput
                id={name}
                name={name}
                type={type}
                value={
                    child !== "none"
                        ? formData[name]?.[child] ?? ""
                        : formData[name] ?? ""
                }
                onChange={(e) => handleChange(e, child)}
                required={child === "none"}
            />
        </div>
    );

    return (
        <Modal show={open} onClose={onClose}>
            <ModalHeader>
                {akunToEdit ? "Edit Akun Dosen Pembimbing" : "Tambah Akun Dosen Pembimbing"}
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    {inputField("Nama", "name")}
                    {inputField("NIP", "details", "nip")}
                    {inputField("No HP", "details", "phone")}
                    {inputField("Email", "email")}
                    <div className={`${!errorMessage ? 'hidden' : ''} text-red-500`}>
                        {errorMessage}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                {/*<Button onClick={handleSubmit}>Simpan</Button>*/}
                <Button onClick={handleSubmit}
                        disabled={onProcess}>{onProcess ? "Menyimpan..." : "Simpan"}</Button>
                <Button color="gray" onClick={onClose}>Batal</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddUpdateAkunDosen;
