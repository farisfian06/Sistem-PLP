import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea } from "flowbite-react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react"; 
import { Logbook } from "@/types/types";
import { router } from "@inertiajs/react";


interface AddUpdateLogbookProps {
  open: boolean;
  onClose: () => void;
  onLogbookAdded: (logbook: Logbook) => void;
  onLogbookUpdated: (logbook: Logbook) => void; 
  logbookToEdit: Logbook | null;
}

// Komponen untuk menambah dan memperbarui logbook
const AddUpdateLogbook: React.FC<AddUpdateLogbookProps> = ({ open, onClose, onLogbookAdded, onLogbookUpdated, logbookToEdit }) => {
  const { data, setData, post, put, processing, reset } = useForm<Partial<Logbook>>({
    tanggal: "",
    mulai: "",
    selesai: "",
    keterangan: "",
    dokumentasi: "",
  });

  // mengisi form jika dalam mode edit
  useEffect(() => {
    console.log("logbookToEdit:", logbookToEdit); // Debugging
    if (logbookToEdit) {
      setData(logbookToEdit);
    } else {
      reset();
    }
  }, [logbookToEdit, setData, reset]);
  
  // submit form (tambah/update logbook)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data yang dikirim:", data);
  
    if (logbookToEdit) {
      put(route("logbooks.update", logbookToEdit.id), {
        preserveState: true,
        onSuccess: () => {
          console.log("Logbook berhasil diperbarui!");
          reset();
          onClose();
          router.visit(route("logbooks"), { replace: true }); // Navigasi kembali
        },
        onError: (errors) => console.error("Gagal memperbarui logbook:", errors),
      });
    } else {
      post(route("logbooks.store"), {
        preserveState: true,
        onSuccess: () => {
          console.log("Logbook berhasil ditambahkan!");
          reset();
          onClose();
          router.visit(route("logbooks"), { replace: true }); // Navigasi kembali
        },
        onError: (errors) => console.error("Gagal menambahkan logbook:", errors),
      });
    }
  };
  
  

  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900">{logbookToEdit ? "Edit Logbook" : "Tambah Logbook"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="tanggal">Tanggal</Label>
              <TextInput
                id="tanggal"
                type="date"
                value={data.tanggal || ""}
                onChange={(e) => setData("tanggal", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mulai">Waktu Mulai</Label>
                <TextInput
                  id="mulai"
                  type="time"
                  value={data.mulai || ""}
                  onChange={(e) => setData("mulai", e.target.value + ":00")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="selesai">Waktu Selesai</Label>
                <TextInput
                  id="selesai"
                  type="time"
                  value={data.selesai || ""}
                  onChange={(e) => setData("selesai", e.target.value + ":00")}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="keterangan">Keterangan</Label>
              <Textarea
                id="keterangan"
                value={data.keterangan || ""}
                onChange={(e) => setData("keterangan", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dokumentasi">Dokumentasi (URL)</Label>
              <TextInput
                id="dokumentasi"
                type="url"
                value={data.dokumentasi || ""}
                onChange={(e) => setData("dokumentasi", e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button color="gray" onClick={onClose}>Batal</Button>
              <Button type="submit" disabled={processing}>{processing ? "Menyimpan..." : "Simpan"}</Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddUpdateLogbook;
