'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referral, setReferral] = useState('');
  const [mounted, setMounted] = useState(false); // Track whether component is mounted on client
  const router = useRouter();

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

    // {<ToastContainer />}

    const endpoint = isLoginMode ? '/login' : '/signup';
    const payload = isLoginMode
      ? { email, password }
      : { email, password, username, referral };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.text();
        // toast({
        //   title: isLoginMode ? "Login successful!" : "Sign up successful!",
        // });
        router.push('/dashboard');
        // router.push('/customerDashboard');
      } else {
        // toast({title: `Error: ${response.statusText}`});
      }
    } catch (error) {
      // toast.error('An error occurred during the login/signup process.');
      console.error('Error:', error);
    }
  };

  if (!mounted) {
    // Only render the login/signup form after the component has mounted
    return null;
  }

  return (
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
  );
};

export default Login;
