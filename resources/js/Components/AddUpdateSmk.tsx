import { Modal, Button, Label, TextInput, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useState, useEffect } from "react";
import { Smk } from "@/types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (akun: Smk) => void;
  akunToEdit: Smk | null;
}

const AddUpdateSmk = ({ open, onClose, onSubmit, akunToEdit }: Props) => {
  const [formData, setFormData] = useState<Smk>({
    id: Date.now(),
    nama: "",
  });

  useEffect(() => {
    setFormData(
      akunToEdit ?? { id: Date.now(), nama: ""}
    );
  }, [akunToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
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
          {inputField("Nama", "nama")}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Simpan</Button>
        <Button color="gray" onClick={onClose}>Batal</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUpdateSmk;
