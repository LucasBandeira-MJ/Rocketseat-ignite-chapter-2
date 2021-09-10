import { FormEvent, useState } from "react"
import Modal from "react-modal"
import { useTransactions } from "../../hooks/useTransactions"
import { api } from "../../services/api"


import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { Container, RadioBox, TransactionTypeContainer } from "./styles"

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {
    const { createTransaction } = useTransactions();
    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)

    const handleCreateNewTransaction = async (event: FormEvent):Promise<void> => {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        resetInputs()

        onRequestClose()
    }

    const resetInputs = ():void => {
        setTitle('')
        setAmount(0)
        setType('deposit')
        setCategory('')
    }

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

        <Container
            onSubmit={handleCreateNewTransaction}
        >
            <h2>New Transaction</h2>

            <input
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)} 
            />
            <input
                type="number"
                placeholder='Value'
                value={amount}
                onChange={e => setAmount(Number(e.target.value))} 
            />

            <TransactionTypeContainer>
                <RadioBox
                    type="button"
                    isActive={type === 'deposit'}
                    activeColor="green"
                    onClick={()=> {setType('deposit')}}
                >
                    <img src={incomeImg} alt="income arrow" />
                    <span>Income</span>
                </RadioBox>

                <RadioBox
                    type="button"
                    isActive={type === 'withdraw'}
                    activeColor="red"
                    onClick={()=> {setType('withdraw')}}
                >
                    <img src={outcomeImg} alt="outcome arrow" />
                    <span>Expense</span>
                </RadioBox>
            </TransactionTypeContainer>   

            <input
                placeholder='Category'
                value={category}
                onChange={e => setCategory(e.target.value)} 
            />
            <button type="submit">
                Submit
            </button>
        </Container>
      </Modal>
    )
}
