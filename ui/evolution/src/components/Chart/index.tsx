import { FaChessBishop, FaUsers } from 'react-icons/fa'; // Importando ícones do react-icons
import { GiTakeMyMoney } from "react-icons/gi";
import React, { useEffect, useState } from 'react';

const Chart: React.FC = () => {
    const [data, setData] = useState({ clients: 0, loans: 0, pawn: 0 });

    useEffect(() => {
        // Função para buscar e processar os dados do banco de dados
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/ibuildCustomer'); // Substitua pelo endpoint da sua API
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                
                // Supondo que sua API retorna um objeto com as chaves `clients`, `loans` e `pawn`
                setData({
                    clients: result.clients || 0,
                    loans: result.loans || 0,
                    pawn: result.pawn || 0,
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex max-w-7xl justify-between py-10 mx-auto">
                <div className="flex flex-col justify-between px-20 hover:shadow-2xl p-9 bg-white-900 transition duration-1000 ease-in-out rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaUsers className="text-blue-500" size={32} /> {/* Ícone de usuários colorido */}
                        <p className="text-lg leading-8 text-gray-600">Total de clientes</p>
                    </div>
                    <p className="text-2xl font-extrabold">{data.clients} <span className='text-sm leading-8 text-gray-500'>clientes</span></p>
                </div>
                <div className="flex flex-col justify-between px-20 hover:shadow-2xl p-9 bg-white-900 transition duration-1000 ease-in-out rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-2">
                        <GiTakeMyMoney className="text-blue-500" size={35} /> {/* Ícone de layout/loans colorido */}
                        <p className="text-lg leading-8 text-gray-600">Total de Empréstimos</p>
                    </div>
                    <p className="text-2xl font-extrabold">{data.loans} <span className='text-sm leading-8 text-gray-500'>Empréstimos</span></p>
                </div>

                <div className="flex flex-col justify-between px-20 hover:shadow-2xl p-9 bg-white-900 transition duration-1000 ease-in-out rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaChessBishop className="text-blue-500" size={32} /> {/* Ícone de aprovação colorido */}
                        <p className="text-lg leading-8 text-gray-600">Clientes Penhorados</p>
                    </div>
                    <p className="text-2xl font-extrabold">{data.pawn} <span className='text-sm leading-8 text-gray-500'>clientes</span></p>
                </div>
            </div>
        </>
    );
};

export { Chart };
