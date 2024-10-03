import React, { useEffect, useState } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { DeleteModal } from '../Modal/deleteModal';

// Interface Customer atualizada
interface Customer {
    loan: any;
    id: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    contact: string;
    gender: string;
    address: string;
    incomeSource: string;
    monthlyIncome: number;
    bankInfo: string;
    bankNumber: string;
    identityNumber: string;
    hasActiveLoan: boolean; // Novo campo para indicar se o cliente tem um empréstimo ativo
    isActive?: 'PENDING' | 'ACTIVE' | 'REFUSED'; // Novo campo para status do empréstimo
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDownloading, setIsDownloading] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/ibuildCustomer');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const deleteCustomer = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/ibuildCustomer/${id}`);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const downloadPDF = async (id: string) => {
        if (isDownloading === id) return;

        setIsDownloading(id);

        try {
            const response = await axios.get(`http://localhost:3001/downloadPDF/${id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `customer_${id}.pdf`); // Nome do arquivo
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setIsDownloading(null);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto">
            <h1 className="py-7 text-slate-800 leading-5">Lista de Clientes</h1>
            <div className="relative text-gray-600 mb-4">
                <input
                    type="search"
                    name="search"
                    placeholder="Pesquisar por nome..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                />
            </div>
            <table className="min-w-full divide-y divide-gray-200 shadow-2xl">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500"></th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Nome</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">B.Identidade</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">D.Nascimento</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Contacto</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Sexo</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Endereço</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Fonte de Renda</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Renda</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Banco</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Número de Conta</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Eliminar</th>
                        <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Ficha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td className="text-center px-5 text-lg text-gray-500">
                                {/* Determina a cor com base no status do empréstimo */}
                                <div className={`w-2 h-2 rounded-full ${customer.loan?.isActive === 'ACTIVE' ? 'bg-green-500' :
                                        customer.loan?.isActive === 'PENDING' ? 'bg-yellow-500' :
                                            customer.loan?.isActive === 'REFUSED' ? 'bg-red-500' :
                                                'bg-gray-500' // caso não haja status
                                    }`} />
                            </td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.fullName}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.identityNumber}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.contact}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.gender}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.address}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.incomeSource}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.monthlyIncome.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.bankInfo}</td>
                            <td className="px-6 py-4 text-xs leading-5 text-gray-500">{customer.bankNumber}</td>
                            <td className="px-6 py-4 text-lg leading-5 text-gray-500">
                                <DeleteModal
                                    text="Eliminar"
                                    onSubmit={() => deleteCustomer(customer.id)}
                                    id={customer.id}
                                />
                            </td>
                            <td className="px-6 py-4 text-lg leading-5 text-gray-500">
                                <button
                                    onClick={() => downloadPDF(customer.id)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    {isDownloading === customer.id ? (
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

export default Customers;
