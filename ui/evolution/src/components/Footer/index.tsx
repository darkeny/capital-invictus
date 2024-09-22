import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div data-aos="zoom-in" className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Company Name and Description */}
                <div className="flex space-x-3">
                    <img 
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" 
                        alt="Logo" 
                        className="w-10 h-10 pb-2"
                    />
                    <h2 className="text-xl font-semibold">Capital Invictus</h2>
                </div>

                {/* Solutions */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Soluções</h3>
                    <ul className="space-y-1">
                        <li><a href="/loan" className="text-gray-400 hover:text-gray-300">Crédito</a></li>
                        <li><a href="fees" className="text-gray-400 hover:text-gray-300">Poupança</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Suporte</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-gray-300">Pricing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-gray-300">Documentation</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-gray-300">Guides</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-gray-300">Apoio ao Cliente</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Empresa</h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="text-gray-400 hover:text-gray-300">Home</a></li>
                        <li><a href="/services" className="text-gray-400 hover:text-gray-300">Serviços</a></li>
                        <li><a href="a/bout" className="text-gray-400 hover:text-gray-300">Sobre Nós</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-gray-300">Contactos</a></li>
                        <li><a href="/howabout" className="text-gray-400 hover:text-gray-300">Como Funciona</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Jurídico</h3>
                    <ul className="space-y-1">
                        <li><a href="#" className="text-gray-400 hover:text-gray-300">Termos</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-gray-300">Privacidade</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Capital Invictus. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export { Footer };
