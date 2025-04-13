import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useState } from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateAkunDosen from "@/Components/AddUpdateAkunDosen";
import { AkunDosen } from "@/types/types";
import { Head } from "@inertiajs/react";

const InputAkunDosen = () => {
  const [akunDosen, setAkunDosen] = useState<AkunDosen[]>([
    { 
      id: 1, 
      nama: "Agung", 
      nip: "12345",
      noHp: "0812345678",
      email: "agung@example.com",
      password: "password123"
    },
    { 
      id: 2, 
      nama: "Citra", 
      nip: "67890",
      noHp: "08123456789",
      email: "citra@example.com",
      password: "password123"
    }
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [akunToEdit, setAkunToEdit] = useState<AkunDosen | null>(null);

  const handleAdd = () => {
    setAkunToEdit(null);
    setOpenModal(true);
  };

  const handleEdit = (akun: AkunDosen) => {
    setAkunToEdit(akun);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setAkunDosen(akunDosen.filter((akun) => akun.id !== id));
  };

  const handleSubmit = (newAkun: AkunDosen) => {
    if (akunToEdit) {
      setAkunDosen(
        akunDosen.map((akun) =>
          akun.id === newAkun.id ? newAkun : akun
        )
      );
    } else {
      setAkunDosen([...akunDosen, newAkun]);
    }
  };

  const columns = [
    { label: "Nama", key: "nama" },
    { label: "NIP", key: "nip" },
    { label: "No HP", key: "noHp" },
    { label: "Email", key: "email" },
    { label: "Password", key: "password" },
  ];
  
  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarComponent />
      <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
        <Head title="Input Akun Dosen" />
        <h2 className="text-xl font-bold mb-4">Akun Dosen</h2>
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
                <TableHeadCell className="w-full sm:w-1/6 md:w-1/6 justify-center text-center">Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {akunDosen.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center">
                    Belum ada data akun dosen
                  </TableCell>
                </TableRow>
              ) : (
                akunDosen.map((akun) => (
                  <TableRow key={akun.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {(akun[column.key as keyof AkunDosen])}
                      </TableCell>
                    ))}
                    <TableCell className="flex justify-center gap-2">
                      <Button size="xs" onClick={() => handleEdit(akun)} className="bg-blue-100 text-blue-600">
                        <HiPencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleDelete(akun.id)}
                        className=" bg-red-100 text-red-600"
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
          <AddUpdateAkunDosen
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

export default InputAkunDosen;
