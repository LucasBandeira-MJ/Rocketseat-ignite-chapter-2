import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions'

import { Container } from './styles'

export const Summary = () => {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    const formatCurrency = (value:number):string => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    }

    console.log('transactions: ',transactions)

    return (
        <Container>
            <div>
                <header>
                    <p>Incomes</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{formatCurrency(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Expenses</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>- {formatCurrency(summary.withdraws)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{formatCurrency(summary.total)}</strong>
            </div>
        </Container>
    )
}

