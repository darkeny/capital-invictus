import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth';
import { Home } from '../pages/Home';
import NotFound from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import Loan from '../pages/Loan';
import Contact from '../pages/Contact';



const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/signup'} element={<SignUp />} />
                    <Route path={'/signin'} element={<SignIn />} />
                    <Route path={'/loan'} element={<Loan />} />
                    <Route path={'/contact'} element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
