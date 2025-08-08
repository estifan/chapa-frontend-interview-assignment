'use client';

import { useState, useEffect } from 'react';
import {
    BsCashStack,
    BsArrowUpRight,
    BsArrowDownLeft,
    BsWallet2,
    BsPlusCircle,
    BsSend,
    BsDownload,
    BsCreditCard,
    BsGraphUp,
    BsArrowDownRight,
    BsX
} from "react-icons/bs";

import TransactionForm from "@/app/components/TransactionForm";

export default function User() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [FormLoading, setFormLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [transactionsLoading, setTransactionsLoading] = useState(false);

    useEffect(() => {
        setTransactionsLoading(true);
        setTimeout(() => {
            setTransactions([
                {
                    id: 1,
                    description: 'Salary Deposit',
                    category: 'Income',
                    date: '2023-06-15',
                    amount: 'ETB 85,000.00',
                    type: 'credit',
                    status: 'completed'
                },
                {
                    id: 2,
                    description: 'Grocery Store',
                    category: 'Shopping',
                    date: '2023-06-14',
                    amount: 'ETB 3,450.00',
                    type: 'debit',
                    status: 'completed'
                },
                {
                    id: 3,
                    description: 'Electric Bill',
                    category: 'Utilities',
                    date: '2023-06-12',
                    amount: 'ETB 1,250.00',
                    type: 'debit',
                    status: 'pending'
                },
                {
                    id: 4,
                    description: 'Freelance Work',
                    category: 'Income',
                    date: '2023-06-10',
                    amount: 'ETB 25,000.00',
                    type: 'credit',
                    status: 'completed'
                },
            ]);
            setTransactionsLoading(false);
        }, 2000);
    }, []);

    const handleNewTransaction = (transactionData) => {
        const url = "/api/initialize";

        const payload = {
            amount: transactionData.amount,
            currency: transactionData.currency,
            email: transactionData.email,
            first_name: transactionData.first_name,
            last_name: transactionData.last_name,
            phone_number: transactionData.phone_number,
            tx_ref: "chewatatest-6669",
            callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
            return_url: "https://www.google.com/",
            customization: {
                title: "Payment for my favourite merchant",
                description: "I love online payments"
            }
        };

        const headers = {
            'Authorization': 'Bearer CHASECK_TEST-HcZne52U2RVP3kwJlwxyBY8VF29snRhT',
            'Content-Type': 'application/json'
        };

        setFormLoading(true);

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                setFormLoading(false);
                const newTransaction = {
                    id: transactions.length + 1,
                    description: `Transfer to ${transactionData.first_name} ${transactionData.last_name}`,
                    category: 'Transfer',
                    date: new Date().toISOString().split('T')[0],
                    amount: `ETB ${parseFloat(transactionData.amount)}`,
                    type: 'debit',
                    url: data.data.checkout_url,
                    status: 'pending'
                };
                setTransactions([newTransaction, ...transactions]);
                setIsFormOpen(false);
                window.open(data.data.checkout_url, '_blank');
            })
            .catch(error => {
                setError(error.message);
                setFormLoading(false);
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
                    <p className="text-sm text-gray-500">Welcome back! Here's an overview of your finances</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <BsPlusCircle className="mr-2" size={20} />
                    New Transaction
                </button>

                <TransactionForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleNewTransaction}
                    FormLoading={FormLoading}
                />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Balance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Balance */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <BsCashStack size={24} />
                        </div>
                        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-2xl font-bold">ETB 1,245,890.00</p>
                    <p className="text-sm opacity-80 mt-1">+2.5% from last month</p>
                </div>

                {/* Available Balance */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-xl">
                            <BsWallet2 className="text-green-600" size={24} />
                        </div>
                        <span className="text-sm text-gray-500">Available</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">ETB 845,632.00</p>
                    <p className="text-sm text-gray-500 mt-1">Last updated 2 mins ago</p>
                </div>

                {/* Incoming */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <BsArrowDownLeft className="text-blue-600" size={24} />
                        </div>
                        <span className="text-sm text-gray-500">Incoming</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">ETB 125,400.00</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                        <BsArrowUpRight className="mr-1" size={14} />
                        12.5% from last month
                    </p>
                </div>

                {/* Outgoing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 p-3 rounded-xl">
                            <BsArrowUpRight className="text-red-600" size={24} />
                        </div>
                        <span className="text-sm text-gray-500">Outgoing</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">ETB 45,230.00</p>
                    <p className="text-sm text-red-500 flex items-center mt-1">
                        <BsArrowDownRight className="mr-1" size={14} />
                        8.2% from last month
                    </p>
                </div>
            </div>


            {/* Transactions Table */}
            <div className="bg-white rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                    <button className="text-primary text-sm font-medium">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((txn, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {txn.type === 'credit' ?
                                                    <BsArrowDownLeft className="h-4 w-4 text-green-600" /> :
                                                    <BsArrowUpRight className="h-4 w-4 text-red-600" />
                                                }
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{txn.description}</div>
                                                <div className="text-sm text-gray-500">{txn.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {txn.date}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {txn.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && !transactionsLoading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                            {transactionsLoading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}