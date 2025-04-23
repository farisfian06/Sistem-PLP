import { Button,   Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {NewEditUser, User} from "@/types/types";

interface Props {
    title: string,
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onProcess: boolean;
}

const ConfirmationModal = ({ open, onClose, onSubmit, title, onProcess }: Props) => {

    return (
        <Modal show={open} size="md" onClose={onClose} popup>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {title}
                    </h3>
                    <div className="flex justify-center gap-4">
                        {!onProcess ? <>
                            <Button color="failure" onClick={onSubmit}>
                                {"Ya saya yakin"}
                            </Button>
                            <Button color="red" onClick={onClose}>
                                Tidak, batalkan
                            </Button>
                        </> :
                            <span>Menghapus...</span>
                        }
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ConfirmationModal;
