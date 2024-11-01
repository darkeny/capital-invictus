import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useFetchUserData = () => {
    const [user, setUser] = useState({
        name: '',
        position: '',
        photo: '',
        role: '',
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

                setUser({
                    name: userData.fullName,
                    position: userData.incomeSource,
                    photo: userData.photo || '../../../public/perfil.jpg',
                    role: userData.role,
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
                navigate('/signin')
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    return { user, loan, loading, error };
};

export { useFetchUserData };
