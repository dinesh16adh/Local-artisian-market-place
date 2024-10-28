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

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
            <div className="text-gray-700">
                <p className="mb-2"><strong>Username:</strong> {user.fullName}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || 'User'}</p>
            </div>
        </div>
    );
};

export default UserProfile;
