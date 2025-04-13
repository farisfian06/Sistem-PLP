import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateKeminatan from "@/Components/AddUpdateKeminatan";
import { Keminatan } from "@/types/types";

const InputKeminatan = () => {
  const [KeminatanList, setKeminatanList] = useState<Keminatan[]>([
    { id: 1, nama: "Pengembangan Perangkat Lunak dan Gim" },
    { id: 2, nama: "Teknik Jaringan Komputer dan Telekomunikasi" },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [KeminatanToEdit, setKeminatanToEdit] = useState<Keminatan | null>(null);

  const sortedKeminatanList = useMemo(() => {
    return [...KeminatanList].sort((a, b) => {
      const getNumber = (name: string) => parseInt(name.match(/\d+/)?.[0] || "0");
      return getNumber(a.nama) - getNumber(b.nama);
    });
  }, [KeminatanList]);

  const handleAdd = () => {
    setKeminatanToEdit(null);
    setOpenModal(true);
  };

  const handleEdit = (Keminatan: Keminatan) => {
    setKeminatanToEdit(Keminatan);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setKeminatanList(KeminatanList.filter((s) => s.id !== id));
  };

  const handleSubmit = (newKeminatan: Keminatan) => {
    if (KeminatanToEdit) {
      setKeminatanList(KeminatanList.map((s) => (s.id === newKeminatan.id ? newKeminatan : s)));
    } else {
      setKeminatanList([...KeminatanList, newKeminatan]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarComponent />
      <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
        <Head title="Input Data Keminatan" />
        <h2 className="text-xl font-bold mb-4">Data Keminatan</h2>
        <div className="p-4 border rounded-lg bg-white shadow-md">
          <div className="mb-4 flex justify-between items-center ">
            <Button onClick={handleAdd}>+ Tambah Keminatan</Button>
          </div>
          <Table striped hoverable>
            <TableHead >
              <TableRow>
                <TableHeadCell className="text-center">Nama Keminatan</TableHeadCell>
                <TableHeadCell className="text-center">Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="text-center">
              {sortedKeminatanList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Belum ada data Keminatan
                  </TableCell>
                </TableRow>
              ) : (
                sortedKeminatanList.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.nama}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button size="xs" className="bg-blue-100" onClick={() => handleEdit(s)}>
                        <HiPencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button size="xs" className="bg-red-100" onClick={() => handleDelete(s.id)}>
                        <HiTrash className="w-4 h-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <AddUpdateKeminatan
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
          akunToEdit={KeminatanToEdit}
        />
      </div>
    </div>
  );
};

export default InputKeminatan;
