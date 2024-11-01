import React, { useState } from 'react';
import { FaEye, FaHandsHelping } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";

const CoreValues: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Toggle card expansion
    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="relative overflow-hidden py-12 sm:py-24">
            {/* Background SVG */}
            {/* <div className="inset-0 -z-10 overflow-hidden">
                <svg className="absolute left-[max(50%,25rem)] top-0 h-[34rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                    <defs>
                        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div> */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div data-aos="zoom-in" className="text-center">
                    <h2 className="text-base font-semibold leading-4 text-indigo-600">Capital Invictus</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Valores que Guiam Nossa Trajetória</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                        Conheça o que guia nossa jornada e inspira cada passo que damos para apoiar você.
                    </p>
                </div>

                <div  data-aos="fade-up" className="mt-16 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                    {[
                        {
                            icon: <GiBullseye className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Missão",
                            description: "Empoderar sonhos e transformar vidas através de soluções de microcrédito inteligentes e acessíveis. Nosso compromisso é entregar não apenas capital, mas confiança, impulsionando indivíduos e empreendedores a conquistar o sucesso com apoio personalizado e sustentável. Na Capital Invictus, cada passo rumo ao futuro é guiado pela excelência e integridade."
                        },
                        {
                            icon: <FaEye className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Visão",
                            description: "Ser o farol que ilumina o caminho para a independência financeira e o crescimento sustentável. Queremos ser reconhecidos como a ponte que transforma aspirações em realizações, criando um impacto positivo em cada cliente e comunidade que tocamos."
                        },
                        {
                            icon: <FaHandsHelping className="mx-auto h-12 w-12 text-indigo-600" />,
                            title: "Valores",
                            description: (
                                <ul className="list-disc list-inside text-left mt-4 space-y-2">
                                    <li><strong>Confiança:</strong> Relacionamentos sólidos baseados em transparência.</li>
                                    <li><strong>Excelência:</strong> Superação de expectativas em cada detalhe do serviço.</li>
                                    <li><strong>Empoderamento:</strong> Oferecimento de crédito com a confiança necessária para o crescimento dos clientes.</li>
                                    <li><strong>Inovação:</strong> Soluções modernas que promovem progresso tangível.</li>
                                    <li><strong>Inclusão:</strong> O crédito como ferramenta de igualdade e oportunidades para todos.</li>
                                    <li><strong>Integridade:</strong> Ética e justiça como pilares fundamentais na jornada financeira.</li>
                                </ul>
                            )
                        }
                    ].map((value, index) => (
                        <div
                            key={index}
                            className={`relative text-center bg-white rounded-2xl shadow-lg p-8 transition-all duration-600 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${expandedIndex === index ? 'h-auto' : 'h-96 overflow-hidden'
                                } flex flex-col justify-between`}
                            onClick={() => handleToggleExpand(index)}
                        >
                            <div>
                                {value.icon}
                                <h3 className="mt-4 text-xl font-bold text-gray-900">{value.title}</h3>
                                <div className="inline mt-4 text-base leading-7 text-gray-600">
                                    {typeof value.description === 'string' ? (
                                        <p className={expandedIndex === index ? '' : 'line-clamp-6'}>
                                            {value.description}
                                        </p>
                                    ) : (
                                        <div className={expandedIndex === index ? '' : 'line-clamp-6'}>
                                            {value.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Indicador de expansão */}
                            <div className="mt-4 text-indigo-600 text-sm font-semibold">
                                {expandedIndex === index ? 'Ver menos' : 'Ver mais'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { CoreValues };
