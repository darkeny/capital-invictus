import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlertPopUp: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleRedirect = () => {
        navigate('/signup');
    };

    return (
        <>
            {isOpen && (
                <div
                    id="static-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                >
                    <div
                        className="absolute z-10 bg-white rounded-lg shadow-xl transform transition-all duration-300 w-full max-w-sm sm:max-w-lg mx-4 sm:mx-8 lg:max-w-xl"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="relative px-6 py-8 lg:px-10 lg:py-12">
                            <div className="absolute top-4 right-4 z-30">
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                    Inscreva-se como Expositor para FACIM
                                </h1>
                                <p className="mt-4 text-base leading-6 text-gray-600 sm:text-lg lg:text-xl">
                                    Uma chance única para sua empresa alcançar o público-alvo e fazer negócios.
                                </p>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleRedirect}
                                    type="button"
                                    className="animate-bounce inline-flex w-full justify-center rounded-md bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                                >
                                    Seja expositor
                                </button>
                            </div>
                            <div className="absolute inset-0 -z-10">
                                <div className="relative w-full h-full bg-gradient-to-tr from-[#f97316] to-[#fb8e43] opacity-10 blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { AlertPopUp };
