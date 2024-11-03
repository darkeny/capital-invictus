import React, { useState } from 'react';
import { FaUserTie, FaLightbulb, FaBriefcase, FaUsers, FaWrench, FaChalkboardTeacher } from "react-icons/fa";

const ForWhom: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Toggle card expansion
    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="relative overflow-hidden py-10 sm:pb-24">
            <div className="absolute inset-x-0 -top-150 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
                    <div
                        className="mx-auto aspect-[1155/778] w-[72.1875rem] bg-gradient-to-tr from-[#00aaff] to-[#005f99] opacity-30"
                        style={{
                            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                        }}
                    />
                </div>
            <div className="bg-gray-900 py-20">
                <div data-aos="zoom-in" className="text-center">
                    <h2 className="text-base font-semibold leading-4 pb-5 text-indigo-400">Público-Alvo</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Quem pode se beneficiar de nossos serviços?</p>
                    <p className="mt-6 text-base/7 text-gray-300 leading-8 max-w-2xl mx-auto">
                        Capital Invictus é dedicado a apoiar indivíduos e empresas em diferentes estágios de crescimento e necessidades.
                    </p>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div data-aos="fade-up" className="mt-16 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                    {[
                        {
                            icon: <FaUserTie className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Pequenos Empreendedores",
                            description: "Donos de pequenas empresas e startups que precisam de capital para crescimento e novos projetos."
                        },
                        {
                            icon: <FaLightbulb className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Indivíduos em Crescimento Pessoal",
                            description: "Pessoas que buscam apoio financeiro para realizar sonhos pessoais, como educação ou reformas."
                        },
                        {
                            icon: <FaBriefcase className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Microempresas",
                            description: "Empresas de pequeno porte que precisam de crédito para operar e adquirir novos equipamentos."
                        },
                        {
                            icon: <FaUsers className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Empreendedores Locais",
                            description: "Profissionais que desejam desenvolver projetos locais e comunitários."
                        },
                        {
                            icon: <FaWrench className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Trabalhadores Autônomos",
                            description: "Freelancers que precisam de um impulso financeiro para expandir suas atividades."
                        },
                        {
                            icon: <FaChalkboardTeacher className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Educadores e Treinadores",
                            description: "Profissionais da educação que desejam investir em recursos para melhorar suas aulas e cursos."
                        }
                    ].map((target, index) => (
                        <div
                            key={index}
                            className={`relative text-center bg-white rounded-2xl shadow-lg p-8 transition-all duration-600 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${expandedIndex === index ? 'h-auto' : 'h-92 overflow-hidden'
                                } flex flex-col justify-between`}
                            onClick={() => handleToggleExpand(index)}
                        >
                            <div>
                                {target.icon}
                                <h3 className="mt-4 text-xl font-bold text-gray-900">{target.title}</h3>
                                <p className={`mt-4 text-base leading-7 text-gray-600 ${expandedIndex === index ? '' : 'line-clamp-6'}`}>
                                    {target.description}
                                </p>
                            </div>
                            {/* Condicional para exibir "Ver mais" somente se o texto for longo */}
                            {typeof target.description === 'string' && target.description.length > 100 && (
                                <div className="mt-4 text-indigo-600 text-sm font-semibold">
                                    {expandedIndex === index ? 'Ver menos' : 'Ver mais'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { ForWhom };
