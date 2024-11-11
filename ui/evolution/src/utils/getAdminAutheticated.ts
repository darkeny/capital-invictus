import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useFetchAdminData = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/imiAdmin`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                const userData = response.data.user;

                setUser({
                    username: userData.username,
                    email: userData.email,
                    role: userData.role,
                });
            } catch (err) {
                setError('Erro ao carregar os dados do usuário');
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    return { user, loading, error };
};

export { useFetchAdminData };
