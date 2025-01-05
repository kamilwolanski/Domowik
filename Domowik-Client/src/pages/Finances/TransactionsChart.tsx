import React, { useEffect, useState } from 'react';
import { AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface Finance {
    name: string;
    count: number;
}

interface ITransactionList {
    transactionList: Finance[];
}

const TransactionsChart: React.FC<ITransactionList> = ({ transactionList }) => {
    const [transactionsData, setTransactionsData] = useState<Finance[]>([]);

    const updateBalance = () => {
        let newBalance = 0;
        const updatedTransactions = [
            { name: '', count: 0 },
            ...transactionList.map(item => ({
                ...item,
                count: newBalance += item.count
            }))
        ];
        setTransactionsData(updatedTransactions);
    };

    useEffect(() => {
        updateBalance();
    }, [transactionList]);

    const CustomTooltip = ({ active, payload, label }: any) => {
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
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, Math.max(...transactionsData.map(item => item.count))]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" fill="#8884d8" />
                <XAxis />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default TransactionsChart;
