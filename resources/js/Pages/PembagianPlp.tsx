import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Select } from "flowbite-react";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import { useState } from "react";
import SidebarComponent from "@/Components/SidebarComponent";
import ViewDetailPendaftaranModal from "@/Components/ViewDetailPendaftaranModal";
import { Head } from "@inertiajs/react";

const smkOptions = [
  "SMKN 1 Malang",
  "SMKN 2 Malang",
  "SMKN 3 Malang",
  "SMKN 4 Malang",
  "SMKN 5 Malang",
  "SMKN 6 Malang",
  "SMKN 7 Malang",
  "SMKN 8 Malang",
  "SMKN 9 Malang",
  "SMKN 10 Malang",
];

const dosenOptions = ["Agung", "Citra", "Yani"];

const dummyMahasiswa = [
  {
    id: 1,
    nama: "Mahasiswa",
    pilihanSmk: 1,
    dosenPembimbing: "Agung",
    pendaftaranPlp: {
      keminatan: "Pengembangan Perangkat Lunak dan Gim",
      nilai_plp_1: "A",
      nilai_micro_teaching: "B+",
      pilihan_smk_1: "SMKN 1 Malang",
      pilihan_smk_2: "SMKN 2 Malang",
    },
  },
  {
    id: 2,
    nama: "Mahasiswaa",
    pilihanSmk: 2,
    dosenPembimbing: "Citra",
    pendaftaranPlp: {
      keminatan: "Teknik Jaringan Komputer dan Telekomunikasi",
      nilai_plp_1: "B",
      nilai_micro_teaching: "A",
      pilihan_smk_1: "SMKN 4 Malang",
      pilihan_smk_2: "SMKN 6 Malang",
    },
  },
];

const PembagianPlp = () => {
  const [mahasiswa, setMahasiswa] = useState(dummyMahasiswa);
  const [viewData, setViewData] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleDelete = (id: number) => {
    setMahasiswa(mahasiswa.filter((m) => m.id !== id));
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  const handleView = (data: any) => {
    setViewData(data);
  };

  const handleCloseView = () => setViewData(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(mahasiswa.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const isCheckedAll = mahasiswa.length > 0 && selectedIds.length === mahasiswa.length;

  const handleSubmit = () => {
    const selectedMahasiswa = mahasiswa.filter((m) => selectedIds.includes(m.id));
    console.log("Data yang disubmit:", selectedMahasiswa);
  };


  const renderSelect = (value: any, options: string[], onChange: (value: any) => void) => (
    <Select
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-xs mx-auto"
    >
      {options.map((option, index) => (
        <option key={index} value={index + 1}>
          {option}
        </option>
      ))}
    </Select>
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarComponent />
      <div className="flex-1 p-6 lg:ml-64 mt-16 max-w-full overflow-x-auto">
        <Head title="Pembagian PLP" />
        <h2 className="text-xl font-bold mb-4">Pembagian PLP</h2>
        <div className="p-4 border rounded-lg bg-white shadow-md">
          <div className="flex justify-between mb-4">
            <Button color="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <Table striped hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>
                  <input
                    type="checkbox"
                    checked={isCheckedAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableHeadCell>
                <TableHeadCell>Nama Mahasiswa</TableHeadCell>
                <TableHeadCell>Pilihan SMK</TableHeadCell>
                <TableHeadCell>Dosen Pembimbing</TableHeadCell>
                <TableHeadCell className="text-center">Aksi</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mahasiswa.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Belum ada data
                  </TableCell>
                </TableRow>
              ) : (
                mahasiswa.map((mhs) => (
                  <TableRow key={mhs.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(mhs.id)}
                        onChange={(e) => handleCheckboxChange(mhs.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>{mhs.nama}</TableCell>
                    <TableCell>{renderSelect(mhs.pilihanSmk, smkOptions, (value) => { mhs.pilihanSmk = value; })}</TableCell>
                    <TableCell>{renderSelect(mhs.dosenPembimbing, dosenOptions, (value) => { mhs.dosenPembimbing = value; })}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button size="xs" onClick={() => handleView(mhs)} className="text-gray-600 bg-gray-100">
                        <HiEye className="w-4 h-4" />
                      </Button>
                      <Button size="xs" color="blue" className="bg-blue-100 text-blue-600">
                        <HiPencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => handleDelete(mhs.id)} className="text-red-600 bg-red-100"
                      >
                        <HiTrash className="w-4 h-4 " />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ViewDetailPendaftaranModal
        show={!!viewData}
        onClose={handleCloseView}
        data={viewData}
      />
    </div>
  );
};

export default PembagianPlp;
