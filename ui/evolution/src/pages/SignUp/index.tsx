import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Alert } from "../../components/Modal/alert";
import axios from "axios";
import { SuccessAlert } from "../../components/Modal/successAlert";
import ERROR_MESSAGES from "../../../../../api/src/constants/error-messages";
import { FaSpinner } from "react-icons/fa6";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: "",
        email: "",
        contact: "",
        gender: "",
        address: "",
        incomeSource: "",
        monthlyIncome: "",
        bankInfo: "",
        bankNumber: "",
        identityNumber: "",
        grantorName: "",
        grantorID: "",
        grantorContact: "",
    });

    const [showGrantorFields, setShowGrantorFields] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBank(value);
        setFormData({
            ...formData,
            bankInfo: value,
        });
    };

    const handleIncomeSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setIsFreelancer(value === "freelancer");
        setFormData({
            ...formData,
            incomeSource: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validação dos campos obrigatórios
        const requiredFields = [
            { field: "fullName", message: "Nome completo é obrigatório." },
            { field: "identityNumber", message: "Bilhete de identidade é obrigatório." },
            { field: "birthDate", message: "Data de Nascimento é obrigatório." },
            { field: "email", message: "Email é obrigatório." },
            { field: "contact", message: "Contacto é obrigatório." },
            { field: "gender", message: "Sexo é obrigatório." },
            { field: "address", message: "Endereço é obrigatório." },
            { field: "incomeSource", message: "Fonte de Renda é obrigatório." },
            { field: "monthlyIncome", message: "Renda Mensal é obrigatório." },
            { field: "bankInfo", message: "Informações bancárias são obrigatórias." },
            { field: "bankNumber", message: "Número da conta bancária é obrigatório." },
        ];

        for (const { field, message } of requiredFields) {
            // @ts-ignore
            if (!formData[field]) {
                setAlertText(message);
                setIsModalOpen(true);
                setLoading(false);
                return;
            }
        }

        // Validação da renda mensal para funcionários
        if (formData.incomeSource === "employee" && !formData.monthlyIncome) {
            setAlertText("Renda mensal é obrigatória para funcionários.");
            setIsModalOpen(true);
            setLoading(false);
            return;
        }

        // Validação dos campos do outorgante se for mostrado
        if (showGrantorFields) {
            const grantorFields = [
                { field: "grantorName", message: "Nome do outorgante é obrigatório." },
                { field: "grantorID", message: "Bilhete de identidade do outorgante é obrigatório." },
                { field: "grantorContact", message: "Contacto do outorgante é obrigatório." },
            ];

            for (const { field, message } of grantorFields) {
                // @ts-ignore
                if (!formData[field]) {
                    setAlertText(message);
                    setIsModalOpen(true);
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            // Lógica de submissão do formulário
            const response = await axios.post(`${apiUrl}/ibuildCustomer`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Sucesso: exibe a mensagem de sucesso e abre o modal de sucesso
                setAlertText('Cliente cadastrado com sucesso!');
                setIsModalSuccessOpen(true);
                // Limpar o formulário após sucesso
                setFormData({
                    fullName: "",
                    birthDate: "",
                    email: "",
                    contact: "",
                    gender: "",
                    address: "",
                    incomeSource: "",
                    monthlyIncome: "",
                    bankInfo: "",
                    bankNumber: "",
                    identityNumber: "",
                    grantorName: "",
                    grantorID: "",
                    grantorContact: "",
                });
                setSelectedBank("");
                setShowGrantorFields(false);
            } else {
                // Sucesso: exibe a mensagem de sucesso e abre o modal de sucesso
                setAlertText('Cliente cadastrado com sucesso!');
                setIsModalSuccessOpen(true);
                // Limpar o formulário após sucesso
                setFormData({
                    fullName: "",
                    birthDate: "",
                    email: "",
                    contact: "",
                    gender: "",
                    address: "",
                    incomeSource: "",
                    monthlyIncome: "",
                    bankInfo: "",
                    bankNumber: "",
                    identityNumber: "",
                    grantorName: "",
                    grantorID: "",
                    grantorContact: "",
                });
                setSelectedBank("");
                setShowGrantorFields(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);

            // Fazendo a verificação se o erro é do tipo AxiosError
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    if (error.response.data.error === ERROR_MESSAGES.duplicateEmail) {
                        setAlertText(ERROR_MESSAGES.duplicateEmail);
                    } else if (error.response.data.error === ERROR_MESSAGES.duplicateIdentityNumber) {
                        setAlertText(ERROR_MESSAGES.duplicateIdentityNumber);
                    } else {
                        setAlertText('Ocorreu um erro ao enviar o formulário.');
                    }
                } else {
                    setAlertText('Ocorreu um erro ao enviar o formulário.');
                }
            } else {
                setAlertText('Ocorreu um erro desconhecido.');
            }

            setIsModalOpen(true); // Abre o modal de erro   
        } finally {
            setLoading(false); // Finalize a ação de loading após sucesso ou erro
        }

    };


    const toggleGrantorFields = () => {
        setShowGrantorFields(!showGrantorFields);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalSuccessOpen(false);
    };

    return (
        <>
            <Navbar />
            <div className="hidden md:block absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.200),white)] opacity-20"></div>
            <div className="hidden md:block absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-left"></div>

            <div data-aos="zoom-in" className="flex justify-center items-center min-h-screen">
                <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 rounded-lg shadow-xl w-full max-w-screen-2xl p-8 mx-4 relative overflow-hidden before:content-[''] before:absolute before:w-48 before:h-48 before:bg-gradient-to-r before:from-gray-400 before:to-blue-500 before:opacity-20 before:rounded-full before:top-0 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:w-64 after:h-64 after:bg-gradient-to-r after:from-yellow-400 after:to-red-500 after:opacity-20 after:rounded-full after:bottom-0 after:right-0 after:translate-x-1/2 after:translate-y-1/2">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Formulário de Inscrição do Cliente</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informação do Cliente */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-700 mb-4">Informação do Cliente</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Nome Completo</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Insira o seu nome completo"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Bilhete de Identidade</label>
                                    <input
                                        type="text"
                                        name="identityNumber"
                                        value={formData.identityNumber}
                                        onChange={handleInputChange}
                                        placeholder="Insira o número do seu BI"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Insira o seu email"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Contacto</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        placeholder="Insira o seu contacto"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Sexo</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecione o seu sexo</option>
                                        <option value="male">Masculino</option>
                                        <option value="female">Feminino</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Endereço</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Insira o seu endereço"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Fonte de Renda</label>
                                    <select
                                        name="incomeSource"
                                        value={formData.incomeSource}
                                        onChange={handleIncomeSourceChange}
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value=" ">Selecione a fonte de renda</option>
                                        <option value="employee">Funcionário</option>
                                        <option value="freelancer">Freelancer</option>
                                    </select>
                                </div>

                                {formData.incomeSource === "employee" && (
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Renda Mensal</label>
                                        <input
                                            type="text"
                                            name="monthlyIncome"
                                            value={formData.monthlyIncome}
                                            onChange={handleInputChange}
                                            placeholder="Insira a sua renda mensal"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <label className="block text-sm font-normal text-gray-950">Informações Bancárias</label>
                                    <select
                                        name="bankInfo"
                                        value={selectedBank}
                                        onChange={handleBankChange}
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecione o banco</option>
                                        <option value="absa">Absa</option>
                                        <option value="bim">Millenium Bim</option>
                                        <option value="mpesa">M-Pesa</option>
                                        <option value="emola">E-Mola</option>
                                    </select>
                                </div>
                                {selectedBank && (
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Número da Conta</label>
                                        <input
                                            type="text"
                                            name="bankNumber"
                                            value={formData.bankNumber}
                                            onChange={handleInputChange}
                                            placeholder="Insira o número da conta"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="inline-flex items-center mt-3">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={showGrantorFields}
                                    onChange={toggleGrantorFields}
                                />
                                <span className="ml-2 text-gray-700">Incluir informações do outorgante</span>
                            </label>
                        </div>
                        {showGrantorFields && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-700 mb-4">Informação do Outorgante</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Nome do Outorgante</label>
                                        <input
                                            type="text"
                                            name="grantorName"
                                            value={formData.grantorName}
                                            onChange={handleInputChange}
                                            placeholder="Nome completo do outorgante"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Bilhete de Identidade do Outorgante</label>
                                        <input
                                            type="text"
                                            name="grantorID"
                                            value={formData.grantorID}
                                            onChange={handleInputChange}
                                            placeholder="Número do bilhete de identidade"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Contacto do Outorgante</label>
                                        <input
                                            type="text"
                                            name="grantorContact"
                                            value={formData.grantorContact}
                                            onChange={handleInputChange}
                                            placeholder="Contacto do outorgante"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-500 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin h-5 w-5" />
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

            {isModalOpen && (
                <Alert
                    isOpen={isModalOpen}
                    text={alertText}
                    onClose={handleCloseModal}
                />
            )}

            {isModalSuccessOpen && (
                <SuccessAlert
                    isOpen={isModalSuccessOpen}
                    text={alertText}
                    onClose={handleCloseModal}
                />
            )}

        </>
    );
};

export { SignUp };
