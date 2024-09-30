import React from 'react';

const Newsletter: React.FC = () => {
    return (
        <>
            <div className="relative isolate overflow-hidden  py-16 sm:py-24 lg:py-32">
                <div className="inset-0 -z-10 overflow-hidden">
                    <svg className="absolute left-[max(50%,25rem)] top-0 h-[34rem] w-[108rem] -translate-x-4/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                        <defs>
                            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Seja o primeiro <br /> a receber nossas novidades!</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-700">Receba ofertas exclusivas e informações sobre nossos produtos. Junte-se a nós e dê o primeiro passo rumo à independência financeira!</p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <label htmlFor="email" className="sr-only">Endereço de e-mail</label>
                                <input id="email" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-lg border border-gray-300 px-3.5 py-2   focus:ring-gray-400 sm:text-sm sm:leading-6" placeholder="Digite seu e-mail" />
                                <button type="submit" className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Inscrever-se</button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-full bg-indigo-100 p-4">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10l6 5 6-5V7m0-4v4l6 5m-6-9L9 7m0-4L3 7m6 0v4m0 0l3-3 3 3" />
                                    </svg>
                                </div>
                                <dt className="mt-4 font-semibold text-gray-900">Dicas financeiras</dt>
                                <dd className="mt-2 text-gray-600">Receba conteúdos sobre como gerir suas finanças, economizar e aproveitar melhor seu capital.</dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-full bg-green-100 p-4">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 15l2 2 4-4m5 6h6M12 6h8m-8 8h4M6 18v-6m0 0H2v6m0-6h2" />
                                    </svg>
                                </div>
                                <dt className="mt-4 font-semibold text-gray-900">Sem spam</dt>
                                <dd className="mt-2 text-gray-600">Garantimos que você só receberá informações relevantes e ofertas exclusivas.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Newsletter };
