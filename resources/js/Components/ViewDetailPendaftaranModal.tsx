import { Modal, ModalHeader, ModalBody } from "flowbite-react";

interface ViewDetailPendaftaranModalProps {
  show: boolean;
  onClose: () => void;
  data: any | null;
}

const ViewDetailPendaftaranModal: React.FC<ViewDetailPendaftaranModalProps> = ({
  show,
  onClose,
  data,
}) => {
  if (!data) return null;

  const detailItems = [
    { label: "Nama", value: data.nama },
    { label: "Keminatan", value: data.pendaftaranPlp.keminatan },
    { label: "Nilai PLP 1", value: data.pendaftaranPlp.nilai_plp_1 },
    { label: "Nilai Micro Teaching", value: data.pendaftaranPlp.nilai_micro_teaching },
    { label: "Pilihan SMK 1", value: data.pendaftaranPlp.pilihan_smk_1 },
    { label: "Pilihan SMK 2", value: data.pendaftaranPlp.pilihan_smk_2 },
  ];

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Detail Pendaftaran PLP</ModalHeader>
      <ModalBody>
        <div className="space-y-2">
          {detailItems.map((item, index) => (
            <p key={index}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewDetailPendaftaranModal;
