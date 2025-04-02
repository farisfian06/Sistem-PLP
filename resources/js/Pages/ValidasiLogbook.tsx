import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Select, Checkbox } from "flowbite-react";
import { useState } from "react";
import SidebarComponent from "@/Components/SidebarComponent";

// Dummy data
const dummyLogbooks = [
  { id: 1, tanggal: "2024-04-01", keterangan: "Mengerjakan laporan", mulai: "08:00", selesai: "10:00", status: "Diajukan", checked: false },
  { id: 2, tanggal: "2024-04-02", keterangan: "Rapat dengan tim", mulai: "13:00", selesai: "15:00", status: "Diajukan", checked: false },
  { id: 3, tanggal: "2024-04-03", keterangan: "Membuat desain UI", mulai: "10:00", selesai: "12:00", status: "Diajukan", checked: false },
];

const ValidasiLogbook = () => {
  const [logbooks, setLogbooks] = useState(dummyLogbooks);
  const [validasiStatus, setValidasiStatus] = useState(""); // Pilihan validasi default
  const [selectAll, setSelectAll] = useState(false); // Menyimpan status select all

  // Fungsi untuk mengubah status logbook
  const handleStatusChange = (id: number, newStatus: string) => {
    setLogbooks((prevLogbooks) =>
      prevLogbooks.map((log) =>
        log.id === id ? { ...log, status: newStatus } : log
      )
    );
  };

  // Fungsi untuk menangani perubahan checkbox
  const handleCheckboxChange = (id: number) => {
    setLogbooks((prevLogbooks) =>
      prevLogbooks.map((log) =>
        log.id === id ? { ...log, checked: !log.checked } : log
      )
    );
  };

  // Fungsi untuk memvalidasi logbook terpilih
  const handleValidasi = () => {
    setLogbooks((prevLogbooks) =>
      prevLogbooks.map((log) =>
        log.checked ? { ...log, status: validasiStatus, checked: false } : log
      )
    );
    setSelectAll(false);
  };

  // Fungsi untuk menangani perubahan pada checkbox "Select All"
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setLogbooks((prevLogbooks) =>
      prevLogbooks.map((log) => ({ ...log, checked: !selectAll })))
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-80">
        <SidebarComponent />
      </div>
      <div className="flex-1 p-8 mt-8">
        <h1 className="text-xl font-bold">Validasi Logbook</h1>
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">

          {/* pilihan validasi & tombol validasi */}
          <div className="mb-4 flex justify-between">
            <Select
              value={validasiStatus}
              onChange={(e) => setValidasiStatus(e.target.value)}
              className="min-w-40"
            >
              <option value="" disabled hidden>Pilih status</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </Select>
            <Button onClick={handleValidasi} color="blue">Validasi</Button>
          </div>

          {/* Tabel Logbook */}
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell>
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  </TableHeadCell>
                  <TableHeadCell>Tanggal Kegiatan</TableHeadCell>
                  <TableHeadCell>Uraian Kegiatan</TableHeadCell>
                  <TableHeadCell>Waktu Mulai</TableHeadCell>
                  <TableHeadCell>Waktu Selesai</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {logbooks.length > 0 ? (
                  logbooks.map((item) => (
                    <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>
                        <Checkbox checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
                      </TableCell>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>{item.keterangan}</TableCell>
                      <TableCell>{item.mulai}</TableCell>
                      <TableCell>{item.selesai}</TableCell>
                      <TableCell>{item.status}</TableCell>
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
        </div>
      </div>
    </div>
  );
};

export default ValidasiLogbook;
