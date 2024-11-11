import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useFetchUserData = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        position: '',
        photo: '',
        role: '',
        userId: '',
    });
    const [loan, setLoan] = useState({
        amountDue: 0,
        balanceDue: 0,
        status: '',
        totalDays: 0,
        daysLeft: 30,
        createdAt: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                const userData = response.data.user;

                // Verifica o tipo de usuário e configura os dados adequadamente
                if (userData.role === 'ADMIN') {
                    setUser({
                        name: userData.username, // Nome do administrador
                        email: userData.email,
                        position: '', // Não aplicável para administrador
                        photo: userData.photo || '/perfil.jpg',
                        role: userData.role,
                        userId: userData.userId
                    });
                    // Limpar dados de empréstimo, pois não se aplica ao administrador
                    setLoan({
                        amountDue: 0,
                        balanceDue: 0,
                        status: '',
                        totalDays: 0,
                        daysLeft: 0,
                        createdAt: ''
                    });
                } else if (userData.role === 'USER') {
                    setUser({
                        name: userData.fullName, // Nome do cliente
                        email: userData.email,
                        position: userData.incomeSource,
                        photo: userData.photo || '/perfil.jpg',
                        role: userData.role,
                        userId: userData.userId
                    });
                    // Configurar dados do empréstimo se disponíveis
                    setLoan({
                        amountDue: userData.loan?.loanAmount || 0,
                        balanceDue: userData.loan?.balanceDue || 0,
                        status: userData.loan?.isActive,
                        totalDays: userData.loan?.totalDays || 30,
                        daysLeft: 30, // Calcule os dias restantes se necessário
                        createdAt: userData.loan?.createdAt || ''
                    });
                }
            } catch (err) {
                setError('Erro ao carregar os dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    return { user, loan, loading, error };
};

export { useFetchUserData };
