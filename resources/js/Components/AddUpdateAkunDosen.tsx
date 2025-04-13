import { Modal, Button, Label, TextInput, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useState, useEffect } from "react";
import { AkunDosen } from "@/types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (akun: AkunDosen) => void;
  akunToEdit: AkunDosen | null;
}

const AddUpdateAkunDosen = ({ open, onClose, onSubmit, akunToEdit }: Props) => {
  const [formData, setFormData] = useState<AkunDosen>({
    id: Date.now(),
    nama: "",
    nip: "",
    noHp: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData(
      akunToEdit ?? { id: Date.now(), nama: "", nip: "", noHp: "", email: "", password: "" }
    );
  }, [akunToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const inputField = (label: string, name: keyof AkunDosen, type = "text") => (
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
        {akunToEdit ? "Edit Akun Dosen" : "Tambah Akun Dosen"}
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          {inputField("Nama", "nama")}
          {inputField("NIP", "nip")}
          {inputField("No HP", "noHp")}
          {inputField("Email", "email")}
          {inputField("Password", "password")}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Simpan</Button>
        <Button color="gray" onClick={onClose}>Batal</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUpdateAkunDosen;
