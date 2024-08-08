import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>

                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
