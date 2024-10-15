import React, { useEffect, useState } from 'react';
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { PiPiggyBankFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { PieChart } from '../Chart/PieGraph';
import axios, { toFormData } from 'axios';
import Loan from '../../pages/Loan';
import { calculateDaysLeft, CalculationOfFines } from '../../utils';
const apiUrl = import.meta.env.VITE_APP_API_URL;


const ClientFinance: React.FC = () => {
    const [user, setUser] = useState({
        name: '',
        position: '',
        photo: ''
    });

    const [loan, setLoan] = useState({
        amountDue: "" || 0,
        balanceDue: "" || 0,
        status: "",
        totalDays: "" || 0,
        daysLeft: 30,
        createdAt: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const today = new Date();
    const loanCreatedAt = new Date(loan.createdAt);
    const endDate = new Date(loanCreatedAt.setDate(loanCreatedAt.getDate() + 31));
    const multas = CalculationOfFines(endDate, today);

    const daysLeft = calculateDaysLeft(loan.createdAt, loan.totalDays);

    console.log("Dias restantes: ",daysLeft)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fazendo a requisição à rota /me
                const response = await axios.get(`${apiUrl}/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Substitua pelo método que você usa para armazenar o token
                    },
                });
                const userData = response.data.user;

                // Ajuste de acordo com a estrutura dos dados recebidos
                setUser({
                    name: userData.fullName,
                    position: userData.incomeSource,
                    photo: userData.photo || '../../../public/perfil.jpg', // Adapte conforme necessário
                });

                setLoan({
                    amountDue: userData.loan.loanAmount,
                    balanceDue: userData.loan.balanceDue,
                    status: userData.loan.isActive,
                    totalDays: Number(userData.loan.totalDays),
                    daysLeft: Number(userData.day),
                    createdAt: userData.loan.createdAt
                });


            } catch (err) {
                setError('Erro ao carregar os dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);



    const savings = {
        amount: 20000,
        status: 'PENDENTE'
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col p-10 bg-gray-100 rounded-lg shadow-lg">
            {/* Seção do Perfil do Usuário e Informações Financeiras */}
            <div className="lg:flex lg:space-x-6">
                {/* Seção do Perfil do Usuário */}
                <div className="lg:w-1/3 w-full flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                    {user.photo ? (
                        <img src={user.photo} alt="User Profile" className="w-32 h-32 rounded-full mb-4" />
                    ) : (
                        <FaUserAlt className="w-32 h-32 text-gray-400 mb-4" />
                    )}
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500">{user.position}</p>
                </div>

                {/* Seção de Informações Financeiras */}
                <div className="lg:w-2/3 w-full bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Status Financeiro</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Cartão Solicitação */}
                        <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-blue-50 border-blue-800 text-blue-700">
                            <div className="flex items-center">
                                <GiReceiveMoney className="text-blue-600 mb-4" size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Saldo Solicitado</h4>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">{loan.amountDue} MT</h2>
                        </div>

                        {/* Cartão Empréstimo */}
                        <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${loan.status === "ACTIVE" ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-700'} border`}>
                            <div className="flex items-center mb-4">
                                <GiTakeMyMoney className={`${loan.status === "ACTIVE" ? 'text-green-600' : 'text-gray-500'}`} size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Empréstimo</h4>
                                    <p className="text-sm font-semibold">
                                        {loan.status}
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {loan.status === "ACTIVE" && loan.balanceDue > 0 ? `${loan.balanceDue} MT` : 'Sem saldo'}
                            </h2>
                        </div>

                        {/* Cartão Poupança */}
                        <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${savings.status === "ACTIVE" ? 'bg-orange-50 border-yellow-700 text-yellow-700' : 'bg-gray-50 border-gray-300 text-gray-700'} border`}>
                            <div className="flex items-center mb-4">
                                <PiPiggyBankFill className={`${savings.status === "ACTIVE" ? 'text-yellow-600' : 'text-gray-500'}`} size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Poupança</h4>
                                    <p className="text-sm font-semibold">
                                        {savings.status}
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {savings.status === "ACTIVE" && savings.amount > 0 ? `${savings.amount} MT` : 'Sem saldo'}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:flex lg:space-x-6">
                {/* Nova Seção para o Gráfico de Pizza */}
                <div className="lg:w-1/3 w-full flex flex-col items-center bg-white p-5 mt-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Tempo Restante</h3>
                    <PieChart daysLeft={daysLeft} totalDays={loan.totalDays} /> {/* Usando o componente PieChart */}
                </div>

                <div className="lg:w-2/3 w-full bg-white p-6 mt-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Datas Financeiras</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Data de Início</h4>
                            <p className="text-gray-500">
                                {new Date(loan.createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                })}
                            </p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Data de Fim</h4>
                            <p className="text-gray-500">{endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Total de Multas</h4>
                            <p className="text-gray-500">{multas < 0 ? "Sem multas" : `${multas} dia/s`}</p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Taxa de Juros</h4>
                            <p className="text-gray-500">30% do Valor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ClientFinance };
