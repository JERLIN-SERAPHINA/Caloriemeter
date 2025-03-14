import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/personal-details`, {
                    params: { userId },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile Details</h2>
                {userDetails && (
                    <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                            {userDetails.image && (
                                <img
                                    src={`http://localhost:3001/${userDetails.image}`}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                                />
                            )}
                        </div>
                        <p><strong>First Name:</strong> {userDetails.firstName}</p>
                        <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                        <p><strong>Username:</strong> {userDetails.username}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>Date of Birth:</strong> {new Date(userDetails.dob).toLocaleDateString()}</p>
                        <p><strong>Gender:</strong> {userDetails.gender}</p>
                        <p><strong>Pin Code:</strong> {userDetails.pinCode}</p>
                        <p><strong>City:</strong> {userDetails.city}</p>
                        <p><strong>State:</strong> {userDetails.state}</p>
                        <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
                        {userDetails.anotherPhone && <p><strong>Alternate Phone:</strong> {userDetails.anotherPhone}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
