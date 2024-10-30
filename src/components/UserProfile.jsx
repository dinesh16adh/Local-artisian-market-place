import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!user) {
        return <p className="text-center mt-10">Please log in to view your profile.</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        // Optionally, redirect to home or login page
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 flex flex-col items-center">
            
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{user.fullName || 'User'}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <p className="text-gray-700 mb-6"><strong>Role:</strong> {user.role || 'User'}</p>

           
           

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;
