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

  console.log(data)

  const detailItems = [
    { label: "Nama", value: data.user.name },
    { label: "NIM", value: JSON.parse(data.user.details).nim },
    { label: "Angkatan", value: JSON.parse(data.user.details).angkatan },
    { label: "Keminatan", value: data.keminatan.name },
    { label: "Nilai PLP 1", value: data.nilai_plp_1 },
    { label: "Nilai Micro Teaching", value: data.nilai_micro_teaching },
    { label: "Pilihan SMK 1", value: data.pilihan_smk1.name },
    { label: "Pilihan SMK 2", value: data.pilihan_smk2.name },
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
