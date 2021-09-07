import Modal from "react-modal"
import { Container } from "./styles"

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
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
