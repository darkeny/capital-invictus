import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DeleteModal } from '../Modal/deleteModal';
import { SuccessAlert } from '../Modal/successAlert';
import { useFetchUserData } from '../../utils';
import { useNavigate } from "react-router-dom";

const Loans: React.FC = () => {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDownloading, setIsDownloading] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [alertText, setAlertText] = useState('');
    const { user } = useFetchUserData();
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    console.log('Dados do Usuario:', user)

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await axios.get(`${apiUrl}/ibuildLoan`);
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    const deleteLoan = async (id: string) => {
        try {
            await axios.delete(`${apiUrl}/ibuildLoan/${id}`);
            setLoans(loans.filter(loan => loan.id !== id));
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };



    const updateLoanStatus = async (loanId: string, newStatus: string) => {
        try {
            const response = await axios.put(`${apiUrl}/ibuildLoan/${loanId}`, {
                isActive: newStatus,
            });

            if (response.status === 200) {
                setAlertText('Estado atualizado com sucesso!');
                setIsModalSuccessOpen(true);
            }
            fetchLoans()
        } catch (error) {
            console.error("Erro ao atualizar o status do empréstimo", error);
            setAlertText('Erro ao atualizar o status do empréstimo.');
            setIsModalOpen(true);
        }
    };

    const updatePawnStatus = async (loanId: string, newStatus: string) => {
        try {
            const response = await axios.put(`${apiUrl}/ibuildLoan/pawn/${loanId}`, {
                pawn: newStatus, // Atualiza o estado do penhor para 'YES' ou 'NO'
            });

            if (response.status === 200) {
                setAlertText('Estado do penhor atualizado com sucesso!');
                setIsModalSuccessOpen(true);
            }
            fetchLoans(); // Atualiza a lista após a modificação
        } catch (error) {
            console.error("Erro ao atualizar o estado do penhor", error);
            setAlertText('Erro ao atualizar o estado do penhor.');
            setIsModalOpen(true);
        }
    };

    const isPaymentTermExceeded = (createdAt: string | Date): boolean => {
        const loanCreatedAt = new Date(createdAt); // Converte o createdAt para um objeto Date
        const currentDate = new Date(); // Data atual
        const diffInTime = currentDate.getTime() - loanCreatedAt.getTime(); // Diferença em milissegundos
        const diffInDays = diffInTime / (1000 * 3600 * 24); // Converte para dias

        return diffInDays < 30; // Retorna true se o prazo de 30 dias não foi atingido
    };




    const filteredLoans = loans.filter(loan =>
        loan.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalSuccessOpen(false);
    };

    const handleNavigate = () => {
        navigate('/loan');
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="text-right">
                    <button onClick={handleNavigate} className="mr-8 bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 mb-2 md:py-3 px-10 rounded-lg shadow-lg text-lg transition-all duration-300">
                        Novo
                    </button>
                </div>
                <div className="relative text-gray-600 my-2">
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
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Nome do Cliente</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Solicitado</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">A pagar</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Prazo</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Método de Pagamento</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Número da Conta</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Garantia</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Parcelas</th>
                            <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Solicitado</th>
                            {user.role === 'ADMIN' && (
                                <>
                                    <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Penhor</th>
                                    <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Estado</th>
                                    <th className="px-6 py-3 text-left font-medium text-xs leading-5 text-gray-500">Eliminar</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLoans.map((loan: Loan) => (
                            <tr key={loan.id}>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.customer.fullName}</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.loanAmount.toFixed(2)}MT</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.balanceDue.toFixed(2)}MT</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.paymentTerm} dias</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.paymentMethod}</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.accountNumber}</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.collateral}</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">{loan.installments}</td>
                                <td className="px-6 py-4 text-xs leading-5 text-gray-500">
                                    {new Date(loan.createdAt).toLocaleDateString('pt-BR')}
                                </td>
                                {user.role === 'ADMIN' && (
                                    <>
                                        <td className="px-6 py-4 text-xs leading-5 text-gray-500">
                                            <input
                                                type="checkbox"
                                                checked={loan.pawn === 'YES'}
                                                onChange={(e) => updatePawnStatus(loan.id, e.target.checked ? 'YES' : 'NO')}
                                                disabled={isPaymentTermExceeded(loan.createdAt)} // Passa o campo "createdAt"
                                                title={
                                                    isPaymentTermExceeded(loan.createdAt)
                                                        ? "Você não pode penhorar o usuário antes de 30 dias do empréstimo."
                                                        : ""
                                                }
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-xs leading-5 text-gray-500">
                                            <select
                                                //@ts-ignore
                                                value={loan.isActive}
                                                onChange={(e) => updateLoanStatus(loan.id, e.target.value)}
                                                className="rounded p-1"
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="ACTIVE">ACTIVE</option>
                                                <option value="REFUSED">REFUSED</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-lg leading-5 text-gray-500">
                                            <DeleteModal
                                                text="Eliminar"
                                                subtitles='Tem certeza de que deseja excluir esta inscrição?'
                                                onSubmit={() => deleteLoan(loan.id)}
                                                id={loan.id}
                                            />
                                        </td>
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalSuccessOpen && (
                <SuccessAlert
                    isOpen={isModalSuccessOpen}
                    onClose={handleCloseModal}
                    text={alertText}
                />
            )}
        </>
    );
};

export default Loans;
