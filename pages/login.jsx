'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { useToast } from "../src/app/hooks/use-toast";
import ToastContainer from '../src/component/ToastContainer';
import { useUser } from '../src/context/UserContext';



const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referral, setReferral] = useState('');
  const [mounted, setMounted] = useState(false); // Track whether component is mounted on client
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const router = useRouter();
  // const {toast} = useToast()
  const { toast, toasts } = useToast();


  const adminEmail = "admin10k4u1234@gmail.com";
    const adminPassword = "admin1sWorkingHard4u"


  useEffect(() => {
    // Set mounted to true after the component has mounted
    setMounted(true);

    if (typeof window !== 'undefined' && window.location.hash === '#login-section') {
      setIsLoginMode(true);
      document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const API_URL = 'https://billions-backend-1.onrender.com';
    const endpoint = isLoginMode ? '/login' : '/register/client';
    let payload;

    if (isLoginMode) {
      payload = { email, password };
    } else {
      payload = {
        email,
        password,
        username,
        // Only add referral if it's a valid number
        ...(referral ? { referral: referral } : {})  // ✅ this matches json:"referrer"
      };
    }

    console.log(referral)
    localStorage.setItem("referrerId", referral)

    if (email === adminEmail && password === adminPassword) {
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        localStorage.setItem('admin-email', email);
          router.push('/dashboard');

      } catch (error) {
        setMessage("Invalid details");
        setMessageType("error");
        console.error('Error:', error);
      }
    }
  console.log(payload)
    if (adminEmail !== email) {
      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (response.ok && email !== adminEmail) {
          const data = await response.json();
          setMessage(isLoginMode ? "Login successful!" : "Sign up successful!");
          setMessageType("success");

          // Set email in localStorage after successful login or registration
          if (typeof window !== 'undefined') {
            localStorage.setItem('userEmail', email); // Save email in localStorage
            // if (data.referralCode) {
            //   localStorage.setItem('referralCode', data.referralCode.toString());
            //   console.log('Referral code saved to localStorage:', data.referralCode);
            // }
            console.log('Email saved to localStorage:', email);
          }

          console.log("Trying to save email...")
          router.push('/customerDashboard');
        } else {
          setMessage("Invalid details");
          setMessageType("error");
        }
      } catch (error) {
        setMessage("Invalid details");
        setMessageType("error");
        console.error('Error:', error);
      }
    }

  }

  if (!mounted) {
    // Only render the login/signup form after the component has mounted
    return null;
  }


  return (
      <>
        {message && (
            <div
                className={`text-center mb-[-120] mt-50 p-3 rounded-lg ${
                    messageType === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                }`}
            >
              {message}
            </div>
        )}

        <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl" id="login-section">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        </div>

        {/* Toggle Switch */}
        <div className="relative flex h-12 mb-8 border border-white/30 rounded-full overflow-hidden backdrop-blur">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-lg font-medium z-10 transition ${isLoginMode ? 'text-white' : 'text-gray-300'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-lg font-medium z-10 transition ${!isLoginMode ? 'text-white' : 'text-gray-300'}`}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 ${isLoginMode ? 'left-0' : 'left-1/2'}`}
          />
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLoginMode && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Referral Code"
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>

    </div>
      </>
  );
};

export default Login;
