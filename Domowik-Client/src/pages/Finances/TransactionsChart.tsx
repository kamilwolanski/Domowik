import React, { useEffect, useState } from 'react';
import { Finance } from './types';
import { AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ITransactionList {
    transactionList: Finance[];
}

const TransactionsChart: React.FC<ITransactionList> = ({ transactionList }) => {
    const [balance, setBalance] = useState(0);
    const [transactionsData, setTransactionsData] = useState([]);

    const updateBalance = () => {
        let newBalance = 0;
        const updatedTransactions = [
            { name: '', count: 0 },
            ...transactionList.map(item => ({
                ...item,
                count: newBalance += item.count
            }))
        ];
        setBalance(newBalance);
        setTransactionsData(updatedTransactions);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // const formatedData = transactionsData.map(formatDate(it.createdDate))

    useEffect(() => {
        updateBalance();
    }, [transactionList]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const { name, count } = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white p-2 rounded-lg border border-black">
                    <p className="label">{name === "" ? 'Start' : `Transakcja: ${name}`}</p>
                    <p className="value">Bilans: {count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <AreaChart width={500} height={400} data={transactionList}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis domain={[0, Math.max(...transactionsData.map(item => item.count))]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="count" fill="#8884d8" />
            <XAxis dataKey="createdDate" />
        </AreaChart>
    );
};

export default TransactionsChart;
