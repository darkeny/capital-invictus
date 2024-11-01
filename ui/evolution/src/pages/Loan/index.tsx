import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { Alert } from "../../components/Modal/alert";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import axios from "axios";
import { handleError } from "../../handleError";
const apiUrl = import.meta.env.VITE_APP_API_URL;

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
    const [alertText, setAlertText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]); // Para armazenar as imagens da garantia
    const fileInputRef = useRef<HTMLInputElement>(null); // Referência para o campo de arquivos oculto

    // Atualiza automaticamente o campo de prazo com base no valor do empréstimo
    useEffect(() => {
        const loanAmountValue = parseFloat(formData.loanAmount);

        if (!isNaN(loanAmountValue)) {
            if (loanAmountValue >= 2000 && loanAmountValue <= 2499) {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "14" // duas semanas
                }));
            } else if (loanAmountValue >= 2500 && loanAmountValue <= 4999) {
                setFormData(prevState => ({
                    ...prevState,
                    loanTerm: "21" // Três semanas
                }));
            } else if (loanAmountValue >= 5000) {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesList = e.target.files;
        if (filesList) {
            setFiles(Array.from(filesList));
        }
    };

    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação: Verificar se todos os campos estão preenchidos
        if (!formData.loanAmount || !formData.paymentMethod || !formData.collateral) {
            setAlertText('Todos os campos são obrigatórios.');
            setIsModalOpen(true);
            return;
        }

        // Validação: Não aceitar valores menores que 1000 MT
        const loanAmountValue = parseFloat(formData.loanAmount);
        if (isNaN(loanAmountValue) || loanAmountValue < 1000) {
            setAlertText("O valor mínimo para solicitar o empréstimo é de 2000 MT.");
            setIsModalOpen(true);
            return;
        }

        setLoading(true); // Set loading to true when form submission starts

        try {
            // Lógica de submissão do formulário
            const response = await axios.post(`${apiUrl}/ibuildLoan`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Sucesso: exibe a mensagem de sucesso e abre o modal de sucesso
                setAlertText('Empréstimo criado com sucesso');
                setIsModalOpen(true);
                // Limpar o formulário após sucesso
                setFormData({
                    loanAmount: "",
                    loanTerm: "", // Prazo de pagamento
                    paymentMethod: "",
                    accountNumber: "", // Número da conta
                    collateral: "" ,
                    installments: "", // Número de parcelas selecionado
                    isPartialPayment: true, // Para o checkbox de pagamento total
                });
            } else {
                // Sucesso: exibe a mensagem de sucesso e abre o modal de sucesso
                setAlertText('Empréstimo criado com sucesso');
                setIsModalOpen(true);
                // Limpar o formulário após sucesso
                setFormData({
                    loanAmount: "",
                    loanTerm: "", // Prazo de pagamento
                    paymentMethod: "",
                    accountNumber: "", // Número da conta
                    collateral: "",
                    installments: "", // Número de parcelas selecionado
                    isPartialPayment: true, // Para o checkbox de pagamento total
                });
            }
        } catch (error: any) {
            console.error('Error sending message:', error);
            const errorMessage = handleError(error); // Tratamento de erro centralizado
            setAlertText(errorMessage)
            setIsModalOpen(true); // Abre o modal de erro   
        } finally {
            setLoading(false); // Finalize a ação de loading após sucesso ou erro
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
            <div className="hidden md:block absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.200),white)] opacity-20"></div>
            <div className="hidden md:block absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-left"></div>
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
                                        <option value="" disabled>Selecione o banco</option>
                                        <option value="absa">Absa</option>
                                        <option value="bim">Millenium Bim</option>
                                        <option value="mpesa">M-Pesa</option>
                                        <option value="emola">E-Mola</option>
                                    </select>
                                </div>

                                {/* Campo de Número da Conta */}
                                {shouldShowAccountNumberField && (
                                    <div className="relative">
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
                                    <label className="block text-sm font-medium text-gray-700">Garantia</label>
                                    <input
                                        type="text"
                                        name="collateral"
                                        value={formData.collateral}
                                        onChange={handleInputChange}
                                        placeholder="Insira a garantia"
                                        className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Campo de Parcelas */}
                                {shouldShowInstallmentsField && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Número de Parcelas</label>
                                        <div className="flex gap-4 mt-2">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    value="1"
                                                    checked={formData.installments === "1"}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="ml-2">1 parcela</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    value="3"
                                                    checked={formData.installments === "3"}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="ml-2">2 parcelas</label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Checkbox de Pagamento Total */}
                                {shouldShowCheckbox && (
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isPartialPayment"
                                            checked={formData.isPartialPayment}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label className="text-sm font-medium text-gray-700">Efectuar Pagamento Integral</label>
                                    </div>
                                )}

                                {/* Botão para Upload de Arquivo */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">Imagens da Garantia</label>
                                    <button
                                        type="button"
                                        onClick={handleFileButtonClick}
                                        className="mt-2 block w-full p-3 rounded-lg border border-slate-400 text-slate-600 bg-white hover:bg-blue-50 focus:ring-2 focus:ring-blue-500"
                                    >
                                        {files.length > 0 ? 'Imagens Carregadas' : 'Carregar Imagens'}
                                        {files.length > 0 && (
                                            <IoCheckmarkDoneOutline className="h-6 w-6 inline ml-2 text-green-500" />
                                        )}
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {loading ? "Enviando..." : "Enviar Solicitação"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal de Alerta */}
            <Alert
                isOpen={isModalOpen}
                text={alertText}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Loan;


