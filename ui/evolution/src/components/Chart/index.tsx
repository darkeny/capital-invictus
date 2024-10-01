import React, { useEffect, useState } from 'react';

import { FaChessBishop, FaUsers, FaEnvelope } from 'react-icons/fa'; // Importando ícones do react-icons
import { GiTakeMyMoney } from "react-icons/gi";
import { HiPencilSquare } from "react-icons/hi2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BigNumber } from './bigNumber';
import { BarGraph } from './barGraph';
import { LineGraph } from './lineGraph';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Chart: React.FC = () => {
    const [data, setData] = useState({ clients: 0, loans: 0, pawn: 0, newsletter: 0 });
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const CustomerResponse = await fetch(`${apiUrl}/ibuildCustomer`);
                const CustomerResult = await CustomerResponse.json();
                const clients = CustomerResult.length;

                const LoansResponse = await fetch(`${apiUrl}/ibuildLoan`);
                const LoansResult = await LoansResponse.json();
                const loans = LoansResult.length;

                const NewsletterResponse = await fetch(`${apiUrl}/newsletter`);
                const NewsletterResult = await NewsletterResponse.json();
                const newsletter = NewsletterResult.length;
                

                const pawn = 0; // Atualize conforme sua necessidade

                setData({ clients, loans, pawn, newsletter}); // Atualize 'newsletter' conforme necessário
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);

    const chartData = {
        labels: ['Clientes', 'Empréstimos', 'Penhorados', 'Newsletter'],
        datasets: [
            {
                label: 'Quantidade',
                data: [data.clients, data.loans, data.pawn, data.newsletter],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = {
        labels: ['Clientes', 'Empréstimos', 'Penhorados', 'Newsletter'],
        datasets: [
            {
                label: 'Quantidade ao longo do tempo',
                data: [data.clients, data.loans, data.pawn, data.newsletter],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
                pointBackgroundColor: [ // Defina cores diferentes para cada ponto
                    'rgba(54, 162, 235, 1)', // Cor para Clientes
                    'rgba(75, 192, 192, 1)', // Cor para Empréstimos
                    'rgba(255, 99, 132, 1)', // Cor para Newsletter
                    'rgba(255, 206, 86, 1)', // Cor para Penhorados
                ],
            },
        ],
    };
    

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Estatísticas Gerais',
            },
        },
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tendência de Estatísticas ao Longo do Tempo',
            },
        },
    };

    return (
        <>
            <div className="flex max-w-screen-2xl justify-between gap-6 py-10 mx-auto">
                <BigNumber title="Total de clientes" subtitles='Clientes' value={data.clients} icon={<FaUsers className="text-blue-500" size={32} />} />
                <BigNumber title="Total de Empréstimos" subtitles='Empréstimos' value={data.loans} icon={<GiTakeMyMoney className="text-blue-500" size={35} />} />
                <BigNumber title="Clientes Penhorados" subtitles='Penhorados' value={data.pawn} icon={<FaChessBishop className="text-blue-500" size={32} />} />
                <BigNumber title="Newslleter" subtitles='Interessados'value={data.newsletter} icon={<HiPencilSquare className="text-blue-500" size={32} />} />
            </div>
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                <BarGraph chartData={chartData} chartOptions={chartOptions} />
                <LineGraph lineChartData={lineChartData} lineChartOptions={lineChartOptions} />
            </div>
        </>
    );
};

export { Chart };
