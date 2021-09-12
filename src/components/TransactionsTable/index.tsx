import { useTransactions } from "../../hooks/useTransactions"
import { Container } from "./styles"

import trashImg from '../../assets/trash.svg'



export const TransactionsTable = () => {
    const { transactions, deleteTransaction } = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions?.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency', 
                                    currency: 'USD'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('en-US').format(
                                    new Date(transaction.createdAt)
                                )}
                            </td>
                            <a href="#" onClick={() => deleteTransaction(transaction.id)}>
                                <img  src={trashImg} />
                            </a>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

