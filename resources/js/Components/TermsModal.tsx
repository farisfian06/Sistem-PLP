import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <Modal show={open} onClose={onClose}>
      <ModalHeader>Syarat & Ketentuan</ModalHeader>
      <ModalBody>
        <ul className="list-decimal ml-5 space-y-1 text-sm">
          <li>Mahasiswa telah memenuhi seluruh mata kuliah prasyarat yang ditentukan oleh program studi.</li>
          <li>Telah mencapai jumlah SKS minimal yang diperbolehkan untuk mengikuti PLP.</li>
          <li>Pendaftaran hanya dapat dilakukan sekali, kecuali dibuka masa revisi/pendaftaran ulang oleh admin atau kaprodi.</li>
          <li>Mahasiswa yang telah mendaftar dianggap telah menyetujui seluruh syarat dan ketentuan yang berlaku.</li>
          <li>Segala bentuk kesalahan data yang diinput menjadi tanggung jawab mahasiswa.</li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default TermsModal;
