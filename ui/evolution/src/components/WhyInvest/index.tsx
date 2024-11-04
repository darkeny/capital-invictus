import React from 'react';
import { FaSquareCheck } from "react-icons/fa6";
import { SiBuzzfeed } from "react-icons/si";
import { PiPiggyBankFill } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { Link } from 'react-router-dom';

const WhyInvest: React.FC = () => {
    return (
        <>
            <div className="container mx-auto max-w-screen-xl overflow-hidden bg-white py-24 sm:scroll-py-20">
                <div className="px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div data-aos="fade-up" className="lg:pr-8">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base text-center md:text-left font-semibold leading-4 text-indigo-600">Porquê?</h2>
                                <p className="mt-2 text-2xl text-center md:text-left font-bold tracking-tight text-gray-900 md:text-4xl">Investir na capital invictus?</p>
                                <p className="my-5 text-lg leading-8 text-gray-600">
                                    Rentabilidade alta, Baixas taxas de manutenção de capital, Segurança e transparência, Facilidade de adesão, sem burocracias, Garantia de retorno de investimento.
                                </p>
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
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-lg grid-cols-1 justify-center items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 gap-x-8">
                            <div data-aos="fade-right" className="rounded-3xl bg-white/60 p-8 ring-1 ring-red-500 sm:p-10">
                                <PiPiggyBankFill className="h-9 w-9 text-red-500" aria-hidden="true" />
                                <p className="mt-4 flex items-baseline ">
                                    <span className="text-2xl font-extrabold tracking-tight text-red-500">Conta poupança nos bancos</span>
                                </p>
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    Taxa de Administração
                                </p>
                                <p className="mt-2 text-sm font-extrabold tracking-tight text-red-500">
                                    Juros Variáveis e Falta de transparência
                                </p>
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    Taxas de lucratividade
                                </p>
                                <p className="mt-2 text-xl font-extrabold tracking-tight text-red-500">
                                    1.8% a 2.5%
                                </p>
                                <ul className="my-8 pb-3 space-y-3 text-sm leading-6 text-gray-600"></ul>
                            </div>
                            <div data-aos="fade-right" className="rounded-3xl bg-white/60 p-8 ring-1 ring-green-500 sm:p-10">
                                <PiPiggyBankFill className="h-9 w-9 text-green-500" aria-hidden="true" />
                                <p className="mt-4 flex items-baseline ">
                                    <span className="text-2xl font-extrabold tracking-tight text-green-500">Capital Invictus Funding</span>
                                </p>
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    Taxa de Administração
                                </p>
                                <p className="mt-2 text-sm font-extrabold tracking-tight text-green-500">
                                    transparência de Juros e Taxas a sua disposição
                                </p>
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    Taxas de lucratividade
                                </p>
                                <p className="mt-2 text-xl font-extrabold tracking-tight text-green-500">
                                    2.5% a 5.5%
                                </p>
                                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <a  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })} aria-describedby="tier-enterprise" className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-inset hover:bg-green-600 bg-green-500 ring-green-200 hover:ring-green-300">
                                        Quero investir
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { WhyInvest };
