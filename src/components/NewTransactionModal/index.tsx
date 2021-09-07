import Modal from "react-modal"
import { Container } from "./styles"

import closeImg from '../../assets/close.svg'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container>
            <h2>New Transaction</h2>

            <input
                placeholder='Title'
            />
            <input
                type="number"
                placeholder='Value'
            />
            <input
                placeholder='Category'
            />
            <button type="submit">
                Submit
            </button>
        </Container>
      </Modal>
    )
}
