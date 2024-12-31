import React from 'react';
import { Finance } from './types';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

interface ITransactionList {
    transactionList: Finance[];
}

const list = [
    { id: 0, count: 100 },
    { id: 1, count: 150 },
    { id: 2, count: 170 },
    { id: 3, count: 190 },
    { id: 4, count: 200 },
    { id: 5, count: 210 },
    { id: 6, count: 180 },
]

const TransactionsChart: React.FC<ITransactionList> = ({ transactionList }) => {
    return (
        <AreaChart width={500} height={400} data={list}>
            <Tooltip />
            <Area dataKey="id" />
        </AreaChart>
    );
};

export default TransactionsChart;
