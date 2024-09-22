import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { PageContainer } from "../../components/page-container";
import { Section } from "../../components/section";
import Typewriter from "typewriter-effect";
import { AlertPopUp } from "../../components/Modal/modaPopUp";
import { Benefits } from "../../components/Benefits";
import { Monetize } from "../../components/Monetize";
import { Footer } from "../../components/Footer";
import { CoreValues } from "../../components/CoreValues";

export function Home() {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer caso o componente seja desmontado
  }, []);

  return (
    <>
      <Navbar />
      {showModal && <AlertPopUp />}
      <Section className="relative overflow-x-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          controls={false}
        >
          <source src="/video/FACIM 2024.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>


        {/* Blue Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-800 via-transparent to-transparent opacity-80 z-10"></div>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Content */}
        <PageContainer className="relative z-20">
          {/* Mobile View */}
          <section className="flex flex-col items-center justify-center min-h-[50vh] md:hidden p-5">
            <div className="text-center text-white space-y-6">
              <h2
                data-aos="fade-up"
                className="font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl leading-tight"
              >
                <div
                  className="min-w-[300px]" // Define o tamanho mínimo do container para evitar redimensionamento
                >
                  <Typewriter
                    options={{
                      strings: [
                        "Não é só sobre o dinheiro, mas pela confiança",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 50,
                    }}
                  />
                </div>
                <span className="block text-lg sm:text-xl font-semibold mt-2">
                  Assegure o que importa e avance com tranquilidade.
                </span>
              </h2>
              <div data-aos="fade-up" className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 mt-8">
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-all duration-300">
                  Solicitar Crédito
                </button>
                <Link to="/about">
                  <button className="border border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-all duration-300">
                    Fazer Poupança
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Desktop View */}
          <section className="hidden md:flex flex-col md:flex-row items-center justify-between min-h-[60vh] gap-8 p-10">
            <div className="flex-1 text-white text-left">
              <h1
                data-aos="fade-up"
                className="font-extrabold uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight"
              >
                <div
                  className="min-h-[150px]" // Define o tamanho mínimo do container para evitar redimensionamento
                >
                  <Typewriter
                    options={{
                      strings: [
                        "Não é só sobre o dinheiro, mas pela confiança",
                        "Assegure o que importa e avance com tranquilidade"
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 85,
                    }}
                  />
                </div>
                <span className="block text-xl sm:text-2xl font-semibold mt-4">
                  Cooperativa de Poupança e Crédito.
                </span>
              </h1>
              <div data-aos="fade-up" className="flex space-x-6 mt-8">
                <Link to="/loan">
                  <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-all duration-300">
                    Solicitar Crédito
                  </button>
                </Link>
                <Link to="/about">
                  <button className="border border-white text-white hover:bg-white hover:text-blue-800 font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-all duration-300">
                    Fazer Poupança
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {/* New Image */}
              <img
                src="/back.gif"
                alt="Descrição da imagem"
                className="w-full object-cover"
              />
            </div>
          </section>
        </PageContainer>
      </Section>

      {/* Modern Section below the video */}
      <div className="relative right-0 p-10 w-full max-w-7xl bg-white rounded-3xl shadow-lg z-30 -mt-12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div data-aos="zoom-in" className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Quer garantir um futuro seguro?
            </h3>
            <p className="text-lg text-gray-600 mt-4">
              Proteja seus sonhos! Comece a poupar hoje e veja seu dinheiro crescer com confiança. Com a Capital Invictus, seu futuro está mais próximo de você.
            </p>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 md:py-3 px-8 rounded-lg shadow-lg text-lg mt-6 transition-all duration-300">
              Brevemente
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <Benefits />
      </div>
      <CoreValues />
      <Footer />
    </>
  );
}
