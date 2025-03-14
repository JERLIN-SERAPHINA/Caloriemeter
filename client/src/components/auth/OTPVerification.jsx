import React, { useState } from 'react';
import Button from '../../ui/button'; // Assuming you have a Button component

const OTPVerification = ({ email, onVerify, onResend }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleVerifyClick = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setError('');
        onVerify(otp); // Call the verification function passed from parent
    };

    return (
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg w-full max-w-md mx-auto text-center text-white">
            <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
            <p className="mb-4">
                An OTP has been sent to your email: <strong>{email}</strong>.
                Please enter it below to proceed.
            </p>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="space-y-2">
                <Button onClick={handleVerifyClick}>Verify OTP</Button>
                <Button onClick={onResend} className="bg-gray-500 hover:bg-gray-600">Resend OTP</Button>
            </div>
        </div>
    );
};

export default OTPVerification;