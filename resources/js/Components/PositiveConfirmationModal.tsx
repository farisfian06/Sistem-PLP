import { Button,   Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {NewEditUser, User} from "@/types/types";

interface Props {
    title: string,
    subtitle: string,
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onProcess: boolean;
}

const PositiveConfirmationModal = ({ open, onClose, onSubmit, title, subtitle, onProcess }: Props) => {

    return (
        <Modal show={open} size="md" onClose={onClose} popup>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-2 text-lg font-normal text-gray-900 dark:text-gray-400">
                        {title}
                    </h3>
                    <p className="mb-6 text-md font-normal text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                    <div className="flex justify-center gap-4">
                        {!onProcess ? <>
                                <Button color="default" onClick={onSubmit}>
                                    Ya saya yakin
                                </Button>
                                <Button color="failure" onClick={onClose}>
                                    Tidak, batalkan
                                </Button>
                            </> :
                            <span>Memproses...</span>
                        }
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default PositiveConfirmationModal;
