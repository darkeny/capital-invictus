import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
        clientID: "",
        grantorName: "",
        grantorID: "",
        grantorContact: "",
    });

    const [showGrantorFields, setShowGrantorFields] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [isFreelancer, setIsFreelancer] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    const toggleGrantorFields = () => {
        setShowGrantorFields(!showGrantorFields);
    };

    return (
        <>
            <Navbar />
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
                                        name="clientID"
                                        value={formData.clientID}
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
                                        <option value="">Selecione</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                    </select>
                                </div>

                                <div className="relative col-span-1 lg:col-span-2">
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
                                        <option value="">Selecione</option>
                                        <option value="publico">Funcionário Público</option>
                                        <option value="privado">Funcionário Privado</option>
                                        <option value="freelancer">Freelancer</option>
                                    </select>
                                </div>

                                {!isFreelancer && (
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Renda Mensal</label>
                                        <input
                                            type="number"
                                            name="monthlyIncome"
                                            value={formData.monthlyIncome}
                                            onChange={handleInputChange}
                                            placeholder="Insira sua renda mensal"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}

                                <div className="relative col-span-1 lg:col-span-2">
                                    <label className="block text-sm font-normal text-gray-950">Informação Bancária</label>
                                    <div className="flex space-x-4 items-center">
                                        <select
                                            name="bankInfo"
                                            value={selectedBank}
                                            onChange={handleBankChange}
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="Millenium Bim">Millenium Bim</option>
                                            <option value="Absa">Absa</option>
                                            <option value="E-mola">E-mola</option>
                                            <option value="Mpesa">Mpesa</option>
                                        </select>
                                        {selectedBank && (
                                            <input
                                                type="text"
                                                name="bankNumber"
                                                value={formData.bankNumber}
                                                onChange={handleInputChange}
                                                placeholder="Número da Conta"
                                                className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Toggle para Informação do Outorgante */}
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={toggleGrantorFields}
                                className="flex items-center text-blue-600 font-semibold"
                            >
                                {showGrantorFields ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                                Informação do Outorgante
                            </button>
                        </div>

                        {showGrantorFields && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-700 mb-4">Informação do Outorgante</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="relative">
                                        <label className="block text-sm font-normal text-gray-950">Nome do Outorgante</label>
                                        <input
                                            type="text"
                                            name="grantorName"
                                            value={formData.grantorName}
                                            onChange={handleInputChange}
                                            placeholder="Insira o nome do outorgante"
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
                                            placeholder="Insira o número do BI do outorgante"
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
                                            placeholder="Insira o contacto do outorgante"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botão de Envio */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export { SignUp };
