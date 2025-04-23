import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { AkunPamong } from "@/types/types"

interface AddUpdateAkunPamongProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (akun: AkunPamong) => void;
  akunToEdit: AkunPamong | null;
}

const AddUpdateAkunPamong: React.FC<AddUpdateAkunPamongProps> = ({
  open,
  onClose,
  onSubmit,
  akunToEdit,
}) => {
  const [form, setForm] = useState<AkunPamong>({
    id: akunToEdit?.id || Date.now(),
    nama: akunToEdit?.nama || "",
    nipNik: akunToEdit?.nipNik || "",
    noHp: akunToEdit?.noHp || "",
    role: akunToEdit?.role || "",
    pangkatGolongan: akunToEdit?.pangkatGolongan || "",
    noRekening: akunToEdit?.noRekening || "",
    anRekening: akunToEdit?.anRekening || "",
    namaBank: akunToEdit?.namaBank || "",
    sekolah: akunToEdit?.sekolah || "",
    email: akunToEdit?.email || "",
    password: akunToEdit?.password || "",
  });

  useEffect(() => {
    if (akunToEdit) {
      setForm(akunToEdit);
    } else {
      setForm({
        id: Date.now(),
        nama: "",
        nipNik: "",
        noHp: "",
        role: "",
        pangkatGolongan: "",
        noRekening: "",
        anRekening: "",
        namaBank: "",
        sekolah: "",
        email: "",
        password: "",
      });
    }
  }, [akunToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <Modal show={open} size="lg" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {akunToEdit ? "Edit Akun Pamong" : "Tambah Akun Pamong"}
          </h3>
          {[
            { name: "nama", label: "Nama" },
            { name: "nipNik", label: "NIP/NIK" },
            { name: "noHp", label: "No HP" },
            { name: "pangkatGolongan", label: "Pangkat/Golongan" },
            { name: "noRekening", label: "No Rekening" },
            { name: "anRekening", label: "A.N Rekening" },
            { name: "namaBank", label: "Nama Bank" },
            { name: "sekolah", label: "Sekolah" },
            {name: "email", label: "Email"},
            {name: "password", label:"Password"}
          ].map(({ name, label }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <TextInput
                id={name}
                name={name}
                value={form[name as keyof AkunPamong] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="">-- Pilih Role --</option>
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
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddUpdateAkunPamong;
