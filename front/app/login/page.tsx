import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src="/path/to/logo.png" alt="Logo" className="mb-8" />
            <form className="flex flex-col space-y-4">
                <input type="text" placeholder="Username" className="px-4 py-2 border border-gray-300 rounded" />
                <input type="password" placeholder="Password" className="px-4 py-2 border border-gray-300 rounded" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
