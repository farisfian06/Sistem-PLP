import {Modal, Button, Label, TextInput, ModalHeader, ModalBody, ModalFooter} from "flowbite-react";
import {useState, useEffect} from "react";
import {Smk} from "@/types/types";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (akun: Smk) => void;
    akunToEdit: Smk | null;
    errorMessage: string;
    onProcess: boolean;
}


const AddUpdateSmk = ({open, onClose, onSubmit, akunToEdit, errorMessage, onProcess}: Props) => {
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
        onSubmit(formData as Smk);
    };

    const inputField = (label: string, name: keyof Smk, type = "text") => (
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
                {akunToEdit ? "Edit Data Smk" : "Data Smk"}
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    {inputField("Name", "name")}
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

export default AddUpdateSmk;
