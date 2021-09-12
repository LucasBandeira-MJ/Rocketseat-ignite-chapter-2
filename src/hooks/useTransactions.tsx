import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
// import { api } from '../services/api'
import { v4 as uuidv4 } from 'uuid'



interface Transaction {
    id: string
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: Transaction[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
    deleteTransaction: (transactionId: string) => void 
}


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionsProvider = ({children}:TransactionsProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])


    useEffect(() => {
        // api.get('/transactions')
        // .then(res => setTransactions(res.data.transactions))
        const localTransactions = localStorage.getItem("@DtMoney:transactions")
        localTransactions && setTransactions(JSON.parse(localTransactions))
    }, [])

    const createTransaction = async (transactionInput:TransactionInput) => {
        // const res = await api.post('/transactions', {
        //     ...transactionInput,
        //     createdAt: new Date()
        // })
        // const { transaction } = res.data

        // setTransactions([...transactions, transaction])
        const newTransaction:Transaction = {
            ...transactionInput,
            id: uuidv4(),
            createdAt: `${new Date()}`
        }
        const updatedTransactions = [...transactions, newTransaction]

        setTransactions(updatedTransactions)
        localStorage.setItem('@DtMoney:transactions', JSON.stringify(updatedTransactions))
    }

    const deleteTransaction = (transactionId: string): void => {
        const filteredTransactions = transactions.filter( transaction => transaction.id !== transactionId)
        setTransactions(filteredTransactions)
         localStorage.setItem('@DtMoney:transactions', JSON.stringify(filteredTransactions))
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction, deleteTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}