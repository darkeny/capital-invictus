import React from 'react';
import { Link } from 'react-router-dom';

const WhoWeAre: React.FC = () => {
    return (
        <div className="overflow-hidden bg-white max-w-7xl py-24 sm:py-32 mx-auto">
            <div className="grid max-w-2xl mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:max-w-none lg:grid-cols-2">

                {/* Coluna de Texto */}
                <div data-aos="slide-right" className="lg:pr-8 lg:pt-7">
                    <div className="lg:max-w-screen-2xl">
                        <h2 className="text-base text-center md:text-left font-semibold leading-4 text-indigo-600">
                            Capital Invictus
                        </h2>
                        <p className="mt-2 text-2xl text-center md:text-left font-bold tracking-tight text-gray-900 md:text-4xl">
                            Quem somos?
                        </p>
                        <p className="my-5 text-lg text-justify leading-8 text-gray-600">
                            Capital Invictus é uma organização de poupança e crédito, somos movidos pela missão de transformar sonhos em realizações financeiras. Oferecemos soluções de microcrédito sólidas e acessíveis, dedicadas a apoiar indivíduos e pequenas empresas a prosperar e superar desafios. Nossa força está em um atendimento personalizado, condições justas e no incentivo à poupança responsável, ajudando nossos clientes a conquistar um futuro financeiro seguro e sustentável. Com a Capital Invictus, você encontra mais do que crédito – encontra um parceiro comprometido com o seu sucesso.
                        </p>

                        {/* Botão Solicitar Crédito */}
                        <div className="flex justify-center md:justify-start">
                            <Link to="/loan">
                                <div className="inline-block md:mt-2 rounded-md bg-blue-600 px-10 py-1 text-center text-normal font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Solicitar crédito
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Coluna da Imagem */}
                <div className="flex justify-center lg:justify-end">
                    <img data-aos="slide-left" src="../../../public/GettyImages-1370735949.jpg" alt="Product screenshot" className=" max-w-full rounded-xl shadow-xl" />
                </div>
            </div>
        </div>
    );
};

export { WhoWeAre };
