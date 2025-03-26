import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AddUpdateLogbook from "@/Components/AddUpdateLogbook";
import SidebarComponent from "@/Components/SidebarComponent";
import { Logbook } from "@/types/types";

const Logbooks = () => {
  const { props } = usePage();
  const logbooks: Logbook[] = Array.isArray(props.logbooks) ? props.logbooks : [];

  const [showAddUpdateLogbook, setShowAddUpdateLogbook] = useState(false);
  const [logbookToEdit, setLogbookToEdit] = useState<Logbook | null>(null);

  // Fungsi hapus logbook berdasarkan ID
  const handleLogbookDelete = (id: number) => {
    router.delete(`/logbooks/${id}`, {
      onSuccess: () => router.reload({ only: ["logbooks"] }),
    });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-80">
        <SidebarComponent />
      </div>
      <div className="flex-1 p-8 mt-8">
        <Head title="Logbook" />
        <h1 className="text-xl font-bold">Logbook</h1>
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
        <div className="mb-4 flex justify-between">
          <Button
            onClick={() => {
              setLogbookToEdit(null);
              setShowAddUpdateLogbook(true);
            }}
          >
            Tambah Logbook
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Tanggal Kegiatan</TableHeadCell>
                <TableHeadCell>Uraian Kegiatan</TableHeadCell>
                <TableHeadCell>Waktu Mulai</TableHeadCell>
                <TableHeadCell>Waktu Selesai</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {logbooks.length > 0 ? (
                logbooks.map((item) => (
                  <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.keterangan}</TableCell>
                    <TableCell>{item.mulai}</TableCell>
                    <TableCell>{item.selesai}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        onClick={() => {
                          setLogbookToEdit(item);
                          setShowAddUpdateLogbook(true);
                        }}
                      >
                        <HiPencil className="w-5 h-5" />
                      </Button>
                      <Button onClick={() => handleLogbookDelete(item.id)} className="text-red-500">
                        <HiTrash className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada logbook
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* modal untuk tambah/edit logbook */}
        <AddUpdateLogbook
          open={showAddUpdateLogbook}
          onClose={() => setShowAddUpdateLogbook(false)}
          logbookToEdit={logbookToEdit}
          onLogbookAdded={() => router.reload({ only: ["logbooks"] })}
          onLogbookUpdated={() => router.reload({ only: ["logbooks"] })}
        />
        </div>
        </div>
        
    </div>
  );
};

export default Logbooks;
