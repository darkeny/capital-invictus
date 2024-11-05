import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { OurServices } from "../../components/OurService";
import { ForWhom } from "../../components/ForWhom";
import { InvestmentPackages } from "../../components/InvestmentPackages";
import { WhyInvest } from "../../components/WhyInvest";
import { FinancialConsulting } from "../../components/FinancialConsulting";

const Services: React.FC = () => {
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <Navbar />
            </div>
            <OurServices />
            <FinancialConsulting />
            <ForWhom />
            <WhyInvest />
            <InvestmentPackages />
            <Footer />
        </>
    );
};

export { Services };
