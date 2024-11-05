import React from 'react';
import { FaSquareCheck } from "react-icons/fa6";
import { SiBuzzfeed } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Benefits: React.FC = () => {
    return (
        <>
            <div className="overflow-hidden bg-white py-16 sm:scroll-py-20">
                <div className="px-8 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div data-aos="slide-right" className="lg:pr-8 lg:pt-7">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base text-center md:text-left font-semibold leading-4 text-indigo-600">Capital Invictus</h2>
                                <p className="mt-2 text-2xl text-center md:text-left font-bold tracking-tight text-gray-900 md:text-4xl">A melhor solução</p>
                                <p className="my-5 text-lg leading-8 text-gray-600">Obtenha o crédito que vai transformar seus projetos em realidade. Nosso processo é rápido, confiável e pensado para atender às suas necessidades financeiras.</p>
                                <dl className="max-w-xl space-y-5 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div className="relative pl-9">
                                        <FaSquareCheck className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                        <dt className="inline font-semibold text-gray-900">Facilidade de aprovação.</dt>
                                        <dd className="inline"> Nosso sistema permite um processo rápido e simples para acessar o seu crédito e investimento com agilidade.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <SiBuzzfeed className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                        <dt className="inline font-semibold text-gray-900">Taxas transparentes.</dt>
                                        <dd className="inline"> Oferecemos condições claras e transparentes, para que você saiba exatamente o valor a pagar.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <FaUserTie className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                        <dt className="inline font-semibold text-gray-900">Área do Cliente.</dt>
                                        <dd className="inline"> Acompanhe suas solicitações e financiamentos a qualquer momento na nossa plataforma.</dd>
                                    </div>
                                </dl>
                                {/* Botão Saber Mais */}
                                <div className="flex justify-center md:justify-start">
                                    <Link to="/services">
                                        <div className="inline-block mt-5 md:mt-5 rounded-md bg-blue-600 px-10 py-2 text-center text-normal font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Saber Mais
                                        </div>
                                    </Link>
                                </div>


                            </div>
                        </div>
                        <img data-aos="slide-left" src="/loan.png" alt="Product screenshot" className="w-[48rem] max-w-screen-lg rounded-xl shadow-xl sm:w-[67rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
                    </div>
                </div>
            </div>
        </>
    );
};

export { Benefits };
