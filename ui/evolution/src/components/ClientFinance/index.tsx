import React from 'react';
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { PiPiggyBankFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { PieChart } from '../Chart/PieGraph';

const ClientFinance: React.FC = () => {
    const user = {
        name: 'Neyma Nacimo',
        position: 'Funcionaria',
        photo: '../../../public/perfil.jpg', // Substitua pela URL real da foto ou deixe vazio para o ícone padrão
    };

    const loan = {
        amountDue: 7800,
        status: 'ACTIVO',
        totalDays: 30, 
        daysLeft: 30
    };

    const savings = {
        amount: 20000,
        status: 'ACTIVO'
    };

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
                            <div className="flex items-center mb-3">
                                <GiReceiveMoney className="text-blue-600 mb-4" size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Saldo Solicitado</h4>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">6000MT</h2>
                        </div>

                        {/* Cartão Empréstimo */}
                        <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${loan.status === 'ACTIVO' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-700'} border`}>
                            <div className="flex items-center mb-4">
                                <GiTakeMyMoney className={`${loan.status === 'ACTIVO' ? 'text-green-600' : 'text-gray-500'}`} size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Empréstimo</h4>
                                    <p className="text-sm font-semibold">
                                        {loan.status}
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {loan.status === 'ACTIVO' && loan.amountDue > 0 ? `${loan.amountDue} MT` : 'Sem saldo'}
                            </h2>
                        </div>

                        {/* Cartão Poupança */}
                        <div className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${loan.status === 'ACTIVO' ? 'bg-orange-50 border-yellow-700 text-yellow-700' : 'bg-gray-50 border-gray-300 text-gray-700'} border`}>
                            <div className="flex items-center mb-4">
                                <PiPiggyBankFill className={`${savings.status === 'ACTIVO' ? 'text-yellow-600' : 'text-gray-500'}`} size={40} />
                                <div className="ml-4">
                                    <h4 className="text-lg font-bold text-gray-700">Poupança</h4>
                                    <p className="text-sm font-semibold">
                                        {savings.status}
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold">
                                {savings.status === 'ACTIVO' && savings.amount > 0 ? `${savings.amount} MT` : 'Sem saldo'}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:flex lg:space-x-6">
                {/* Nova Seção para o Gráfico de Pizza */}
                <div className="lg:w-1/3 w-full flex flex-col items-center bg-white p-5 mt-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Tempo Restante</h3>
                    <PieChart daysLeft={loan.daysLeft} totalDays={loan.totalDays} /> {/* Usando o componente PieChart */}
                </div>

                <div className="lg:w-2/3 w-full bg-white p-6 mt-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Datas Financeiras</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Data de Início</h4>
                            <p className="text-gray-500">00/00/0000</p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Data de Fim</h4>
                            <p className="text-gray-500">00/00/0000</p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <h4 className="text-lg font-bold text-gray-700">Multas</h4>
                            <p className="text-red-500">Nenhuma</p>
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
