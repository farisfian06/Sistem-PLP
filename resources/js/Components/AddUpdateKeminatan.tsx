import {Modal, Button, Label, TextInput, ModalHeader, ModalBody, ModalFooter} from "flowbite-react";
import {useState, useEffect} from "react";
import {Keminatan} from "@/types/types";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (akun: Keminatan) => void;
    akunToEdit: Keminatan | null;
    errorMessage: string;
    onProcess: boolean;
}

const AddUpdateKeminatan = ({open, onClose, onSubmit, akunToEdit, errorMessage, onProcess}: Props) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        id: 0,
        name: "",
    });

    const resetForm = () => {
        setFormData({
            id: 0,
            name: "",
        });
    };

    useEffect(() => {
        if (akunToEdit) {
            setFormData(akunToEdit);
        } else {
            resetForm();
        }
    }, [akunToEdit]);

    useEffect(() => {
        if (!open) {resetForm()}
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = () => {
        onSubmit(formData as Keminatan);
    };

    const inputField = (label: string, name: keyof Keminatan, type = "text") => (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <TextInput
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
            />
        </div>
    );

    return (
        <Modal show={open} onClose={onClose}>
            <ModalHeader>
                {akunToEdit ? "Edit Data Keminatan" : "Data Keminatan"}
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    {inputField("Nama Keminatan", "name")}
                    <div className={`${!errorMessage ? 'hidden' : ''} text-red-500`}>
                        {errorMessage}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmit}
                        disabled={onProcess}>{onProcess ? "Menyimpan..." : "Simpan"}</Button>
                <Button color="gray" onClick={onClose}>Batal</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddUpdateKeminatan;
