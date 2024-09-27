import React, { useEffect, useState } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { DeleteModal } from '../Modal/deleteModal';

const Loans: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDownloading, setIsDownloading] = useState<string | null>(null);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await axios.get('http://localhost:3001/ibuildLoan'); // Acesse a rota correta para obter empréstimos
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    const deleteLoan = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/ibuildLoan/${id}`); // Acesse a rota correta para deletar empréstimos
            setLoans(loans.filter(loan => loan.id !== id));
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const downloadPDF = async (id: string) => {
        if (isDownloading === id) return;

        setIsDownloading(id);

        // Simulação de download (substitua pelo seu código de download)
        try {
            const response = await axios.get(`http://localhost:3001/downloadPDF/${id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `loan_${id}.pdf`); // Nome do arquivo
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setIsDownloading(null);
        }
    };

    const filteredLoans = loans.filter((loan: Loan) =>
        loan.customer[0].fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nome do cliente
    );

    return (
        <div className="container mx-auto">
            <h1 className="py-7 text-slate-800 leading-5">Lista de Empréstimos</h1>
            <div className="relative text-gray-600 mb-4">
                <input
                    type="search"
                    name="search"
                    placeholder="Pesquisar por cliente..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                />
            </div>
            <table className="min-w-full divide-y divide-gray-200 shadow-2xl">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Nome do Cliente</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Valor do Empréstimo</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Prazo de Pagamento (meses)</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Método de Pagamento</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Número da Conta</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Colateral</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Parcelas</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Eliminar</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Ficha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLoans.map((loan: Loan) => (
                        <tr key={loan.id}>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.customer[0].fullName}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.loanAmount.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.paymentTerm}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.paymentMethod}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.accountNumber}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.collateral}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.installments}</td>
                            <td className="px-6 py-4 text-lg leading-5 text-gray-500">
                                <DeleteModal
                                    text="Eliminar"
                                    onSubmit={() => deleteLoan(loan.id)}
                                    id={loan.id}
                                />
                            </td>
                            <td className="px-6 py-4 text-lg leading-5 text-gray-500">
                                <button
                                    onClick={() => downloadPDF(loan.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    {isDownloading === loan.id ? (
                                        <FaSpinner className="animate-spin h-5 w-5" />
                                    ) : (
                                        <HiOutlineDownload className="h-5 w-5" />
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Loans;
