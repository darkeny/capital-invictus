import React from "react";
import { Navbar } from "../../components/Navbar";
import { CoreValues } from "../../components/CoreValues";
import { WhoWeAre } from "../../components/WhoWeAre";
import { Partners } from "../../components/Partners";
import { Footer } from "../../components/Footer";

const About: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Navbar />
        <WhoWeAre />
      </div>
      {/* Seção com fundo claro e figuras geométricas no lado direito */}
      <div className="relative bg-gray-200 w-full overflow-hidden">
        <CoreValues />
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export { About };
