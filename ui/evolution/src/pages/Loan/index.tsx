import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";

const Loan: React.FC = () => {
    const [formData, setFormData] = useState({
        loanAmount: "",
        loanTerm: "", // Prazo de pagamento
        paymentMethod: "",
        accountNumber: "", // Número da conta
        collateral: "",
        installments: "", // Número de parcelas selecionado
        isPartialPayment: true, // Para o checkbox de pagamento total
    });

    const [error, setError] = useState(""); // Para armazenar mensagens de erro

    // Atualiza automaticamente o campo de prazo com base no valor do empréstimo
    useEffect(() => {
        const loanAmountValue = parseFloat(formData.loanAmount);

        if (!isNaN(loanAmountValue)) {
            if (loanAmountValue >= 1000 && loanAmountValue <= 1999) {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "7" // Uma semana
                }));
            } else if (loanAmountValue >= 2000 && loanAmountValue <= 3499) {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "21" // Três semanas
                }));
            } else if (loanAmountValue >= 3500) {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "30" // Um mês
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "" // Reseta o campo se o valor for menor que 1000
                }));
            }
        }
    }, [formData.loanAmount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        if (type === "checkbox") {
            setFormData(prevState => ({
                ...prevState,
                [name]: checked,
                installments: checked ? "" : prevState.installments, // Limpa parcelas se o pagamento total for selecionado
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }

        // Limpa a mensagem de erro ao alterar os campos
        setError("");
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData(prevState => ({
                ...prevState,
                installments: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                installments: prevState.installments === value ? "" : prevState.installments,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação: Não aceitar valores menores que 1000 MT
        const loanAmountValue = parseFloat(formData.loanAmount);
        if (isNaN(loanAmountValue) || loanAmountValue < 1000) {
            setError("O valor mínimo para solicitar o empréstimo é de 1000 MT.");
            return;
        }

        console.log("Loan Request Submitted:", formData);
    };

    // Lógica para mostrar o campo de parcelas e o checkbox
    const loanAmountValue = parseFloat(formData.loanAmount);
    const shouldShowInstallmentsField = loanAmountValue >= 10000 && !formData.isPartialPayment;
    const shouldShowCheckbox = loanAmountValue >= 10000;

    // Mostrar o campo de número de conta baseado na forma de pagamento
    const shouldShowAccountNumberField = formData.paymentMethod !== "";

    return (
        <>
            <Navbar />
            <div data-aos="zoom-in" className="flex justify-center items-center min-h-screen">
                <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 rounded-lg shadow-xl w-full max-w-screen-xl p-8 mx-4 relative overflow-hidden before:content-[''] before:absolute before:w-48 before:h-48 before:bg-gradient-to-r before:from-gray-400 before:to-blue-500 before:opacity-20 before:rounded-full before:top-0 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:w-64 after:h-64 after:bg-gradient-to-r after:from-yellow-400 after:to-red-500 after:opacity-20 after:rounded-full after:bottom-0 after:right-0 after:translate-x-1/2 after:translate-y-1/2">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Solicitação de Empréstimo</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informação do Empréstimo */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-700 mb-4">Informação do Empréstimo</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">Valor do Empréstimo</label>
                                    <input
                                        type="number"
                                        name="loanAmount"
                                        value={formData.loanAmount}
                                        onChange={handleInputChange}
                                        placeholder="Insira o valor do empréstimo"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">Prazo de Pagamento (dias)</label>
                                    <input
                                        type="number"
                                        name="loanTerm"
                                        value={formData.loanTerm}
                                        onChange={handleInputChange}
                                        placeholder="O prazo será preenchido automaticamente"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        readOnly
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecione a forma de pagamento</option>
                                        <option value="bim">Millenium Bim</option>
                                        <option value="absa">Absa</option>
                                        <option value="emola">E-mola</option>
                                        <option value="mpesa">M-pesa</option>
                                    </select>
                                </div>

                                {/* Campo de Número da Conta */}
                                {shouldShowAccountNumberField && (
                                    <div className="relative col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Número da Conta</label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            placeholder="Insira o número da conta"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">Garantia de Empréstimo</label>
                                    <textarea
                                        name="collateral"
                                        value={formData.collateral}
                                        onChange={handleInputChange}
                                        placeholder="Detalhe o bem penhorado"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Mostrar o checkbox e o campo de parcelas somente se o valor for maior que 10.000 MT */}
                                {shouldShowCheckbox && (
                                    <div className="relative col-span-1 sm:col-span-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="isPartialPayment"
                                                checked={formData.isPartialPayment}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            Pagamento Total
                                        </label>
                                    </div>
                                )}

                                {shouldShowInstallmentsField && (
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700">Número de Parcelas</label>
                                        <input
                                            type="number"
                                            name="installments"
                                            value={formData.installments}
                                            onChange={handleInputChange}
                                            placeholder="Selecione o número de parcelas"
                                            className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                        >
                            Solicitar Empréstimo
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Loan;
