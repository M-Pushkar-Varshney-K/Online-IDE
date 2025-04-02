import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SecurityKeyInputProps {
  email: string; // Email passed as a prop
  onSubmit: (key: string) => void; // Callback for submitting the security key
}

const Otp = ({ email, onSubmit }: SecurityKeyInputProps) => {
  const [secureKey, setSecureKey] = useState(['', '', '', '', '', '']); // State for secure key

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) { // Ensures only one digit is entered
      const newSecureKey = [...secureKey];
      newSecureKey[index] = value;
      setSecureKey(newSecureKey);

      // Automatically focus on the next input when a digit is entered
      if (value && index < 5) {
        document.getElementById(`secure-key-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const keyCode = secureKey.join('');
    onSubmit(keyCode); // Pass the key to the parent component
  };

  // Mask the email address
  const maskedEmail = email ? `${email.slice(0, 3)}xxxxxxxx@gmail.com` : alert("We didn't find your email");

  return (
    <div className="space-y-4">
      <p className="text-center text-gray-600 mb-4">
        A security key has been sent to your email: <strong>{maskedEmail}</strong>
      </p>
      <div className="flex justify-between space-x-2">
        {/* Secure Key Input Fields */}
        {secureKey.map((digit, index) => (
          <Input
            key={index}
            id={`secure-key-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength='1'
            className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit Security Key
      </Button>
    </div>
  );
};

export default Otp;