import React, { useState } from 'react';
import { FaFileDownload, FaSpinner } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Alert } from '../../components/Modal/alert';
import axios from 'axios';
import ERROR_MESSAGES from '../../constants/error-messages';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const SignIn: React.FC = () => {
    console.log('API URL:', apiUrl);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Novo estado para senha
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false); // Controle de visibilidade do campo de senha

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        // Verifica se o e-mail é válido para exibir o campo de senha
        setShowPasswordField(validateEmail(emailValue));
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
        setLoading(true);

        if (email && password) { // Verifica se o email e senha foram preenchidos
            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password); // Adiciona a senha no formData

                const response = await axios.post(`${apiUrl}/ibuild`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Form submitted successfully', response.data);
                setModalText('Formulário enviado com sucesso!');
                setModalOpen(true);
                setLoading(false);
                setTimeout(() => navigate('/'), 2000); // Redireciona após 2 segundos

            } catch (error: any) {
                console.error('Error submitting form', error);
                if (error.response && error.response.data && error.response.data.error === ERROR_MESSAGES.duplicateEmail) {
                    setModalText(ERROR_MESSAGES.duplicateEmail);
                } else {
                    setModalText('Ocorreu um erro ao enviar o formulário.');
                }
                setModalOpen(true);
                setLoading(false);
            }
        } else {
            setModalText('Por favor, preencha todos os campos obrigatórios.');
            setModalOpen(true);
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="container max-w-7xl mx-auto px-4 sm:px-8">
                <Navbar />
                <div data-aos="zoom-in" className="flex items-center justify-center mt-16 sm:mt-32">
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <a href='/' className="flex flex-col items-center justify-start">
                            <div className="flex flex-col items-center">
                                <span className='px-5 text-xl pt-20'>Faça login para entrar na sua conta</span>
                            </div>
                        </a>


                        <form onSubmit={onSubmit} className="rounded-lg shadow-2xl bg-white w-full p-4 sm:p-10" encType="multipart/form-data">
                            <div className="text-center">
                                <div className="text-xs sm:text-sm leading-6 text-gray-600">
                                    <div className="mb-2">
                                        <div className="flex items-center justify-center gap-2 rounded-md bg-gray-500 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                            <FcGoogle className="h-5 w-5" />
                                            Continuar com o Google
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <input id="email" name="email" type="email" placeholder='Por gentileza Insira o seu email aqui' className="peer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm" value={email} onChange={onEmailChange} />
                                        {formSubmitted && !email && <p className="text-red-400 text-left text-xs sm:text-sm p-2">Por favor, insira um email válido.</p>}
                                    </div>

                                    {showPasswordField && (
                                        <div className="py-2">
                                            <input id="password" name="password" type="password" placeholder='Insira a senha' className="peer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm" value={password} onChange={onPasswordChange} />
                                            {formSubmitted && !password && <p className="text-red-400 text-left text-xs sm:text-sm p-2">Por favor, insira uma senha.</p>}
                                        </div>
                                    )}

                                </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <button
                                    type="submit"
                                    className="relative rounded-md bg-blue-600 px-8 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <FaSpinner className="animate-spin h-6 w-6" />
                                            <span className="ml-2">Enviando...</span>
                                        </div>
                                    ) : (
                                        'Submeter'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Alert text={modalText} isOpen={modalOpen} onClose={closeModal} />
        </>
    );
};

export { SignIn };

