import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useState } from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateAkunPamong from "@/Components/AddUpdateAkunPamong";
import { AkunPamong } from "@/types/types";
import { Head } from "@inertiajs/react";

const InputAkunPamong = () => {
  const [akunPamong, setAkunPamong] = useState<AkunPamong[]>([
    { 
      id: 1, 
      nama: "Budi", 
      nipNik: "12345", 
      role: "Kepala Sekolah / Penanggung Jawab", 
      sekolah: "SMKN 1", 
      noHp: "081234567890", 
      pangkatGolongan: "IV/a", 
      noRekening: "1234567890", 
      anRekening: "Budi", 
      namaBank: "BCA",
      email: "budi@example.com",
      password: "password123",
    },
    { 
      id: 2, 
      nama: "Siti", 
      nipNik: "67890", 
      role: "Koordinator PLP dari SMK", 
      sekolah: "SMKN 2", 
      noHp: "089876543210", 
      pangkatGolongan: "III/c", 
      noRekening: "0987654321", 
      anRekening: "Siti", 
      namaBank: "Mandiri",
      email: "siti@example.com",
      password: "password123"
    }
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [akunToEdit, setAkunToEdit] = useState<AkunPamong | null>(null);

  const handleAdd = () => {
    setAkunToEdit(null); // Buat mode tambah
    setOpenModal(true);
  };

  const handleEdit = (akun: AkunPamong) => {
    setAkunToEdit(akun);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setAkunPamong(akunPamong.filter((akun) => akun.id !== id));
  };

  const handleSubmit = (newAkun: AkunPamong) => {
    if (akunToEdit) {
      // Mode edit
      setAkunPamong(
        akunPamong.map((akun) =>
          akun.id === newAkun.id ? newAkun : akun
        )
      );
    } else {
      // Mode tambah
      setAkunPamong([...akunPamong, newAkun]);
    }
  };

  const akunPamongSorted = [...akunPamong].sort((a, b) =>
    a.sekolah.localeCompare(b.sekolah, "id", { numeric: true })
  );
  
  const columns = [
    { label: "Nama", key: "nama" },
    { label: "NIP/NIK", key: "nipNik" },
    { label: "Role", key: "role" },
    { label: "Sekolah", key: "sekolah" },
    { label: "No HP", key: "noHp" },
    { label: "Pangkat Golongan", key: "pangkatGolongan" },
    { label: "No Rekening", key: "noRekening" },
    { label: "An Rekening", key: "anRekening" },
    { label: "Nama Bank", key: "namaBank" },
    { label: "Email", key: "email" },
    { label: "Password", key: "password" },
  ];
  
  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarComponent />
      <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
        <Head title="Input Akun Pamong" />
        <h2 className="text-xl font-bold mb-4">Akun Pamong</h2>
        <div className="p-4 border rounded-lg bg-white shadow-md">
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={handleAdd}>+ Tambah Akun</Button>
          </div>
          <div className="overflow-x-auto max-w-full">
          <Table striped hoverable className="overflow-x-auto">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableHeadCell key={column.key} className="w-full sm:w-1/6 md:w-1/6">
                    {column.label}
                  </TableHeadCell>
                ))}
                <TableHeadCell className="w-full sm:w-1/6 md:w-1/6 text-center">Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {akunPamong.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center">
                    Belum ada data akun pamong
                  </TableCell>
                </TableRow>
              ) : (
                akunPamongSorted.map((akun) => (
                  <TableRow key={akun.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key} className="truncate">
                        {(akun[column.key as keyof AkunPamong])}
                      </TableCell>
                    ))}
                    <TableCell className="flex justify-center gap-2">
                      <Button size="xs" onClick={() => handleEdit(akun)} className="text-blue-600 bg-blue-100">
                        <HiPencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleDelete(akun.id)}
                        className="bg-red-100 text-red-600"
                      >
                        <HiTrash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
  </div>
          <AddUpdateAkunPamong
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={handleSubmit}
            akunToEdit={akunToEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default InputAkunPamong;
