import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import SidebarComponent from "@/Components/SidebarComponent";
import AddUpdateSmk from "@/Components/AddUpdateSmk";
import { Smk } from "@/types/types";

const InputSmk = () => {
  const [SmkList, setSmkList] = useState<Smk[]>([
    { id: 1, nama: "SMKN 2 Malang" },
    { id: 2, nama: "SMKN 1 Malang" },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [SmkToEdit, setSmkToEdit] = useState<Smk | null>(null);

  const sortedSmkList = useMemo(() => {
    return [...SmkList].sort((a, b) => {
      const getNumber = (name: string) => parseInt(name.match(/\d+/)?.[0] || "0");
      return getNumber(a.nama) - getNumber(b.nama);
    });
  }, [SmkList]);

  const handleAdd = () => {
    setSmkToEdit(null);
    setOpenModal(true);
  };

  const handleEdit = (Smk: Smk) => {
    setSmkToEdit(Smk);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setSmkList(SmkList.filter((s) => s.id !== id));
  };

  const handleSubmit = (newSmk: Smk) => {
    if (SmkToEdit) {
      setSmkList(SmkList.map((s) => (s.id === newSmk.id ? newSmk : s)));
    } else {
      setSmkList([...SmkList, newSmk]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarComponent />
      <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
        <Head title="Input Data SMK" />
        <h2 className="text-xl font-bold mb-4">Data SMK</h2>
        <div className="p-4 border rounded-lg bg-white shadow-md">
          <div className="mb-4 flex justify-between items-center ">
            <Button onClick={handleAdd}>+ Tambah SMK</Button>
          </div>
          <Table striped hoverable>
            <TableHead >
              <TableRow>
                <TableHeadCell className="text-center">Nama Smk</TableHeadCell>
                <TableHeadCell className="text-center">Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="text-center">
              {sortedSmkList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Belum ada data SMK
                  </TableCell>
                </TableRow>
              ) : (
                sortedSmkList.map((s) => (
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
        <AddUpdateSmk
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
          akunToEdit={SmkToEdit}
        />
      </div>
    </div>
  );
};

export default InputSmk;
