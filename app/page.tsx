'use client';
import { Mainpage } from "@/components/mainpage"
import { ViewNote } from "@/components/viewnote"
import { Login } from "@/components/Login"
import { useState } from "react"
import { useEffect } from "react"
import { set } from "react-hook-form";
import config from "@/lib/config";

const server = process.env.REACT_APP_SERVER_URL;


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.backendURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // resulting json would be { email: email, password: password }
      });
  
      // backend will return userid
      if (response.ok) {
        // Assume the API returns an "ok" or some token on success
        // For simplicity, we'll just store a logged-in flag. In a real app, you might store a token.
        const responseText = await response.json();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', responseText);
        setUserId(responseText);
        setIsLoggedIn(true);
      } else {
        // Handle login failure
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (e.g., show an error message)
    }
  };
  
  const logoutUser = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userId', '');
    setIsLoggedIn(false);
    setUserId("");
  }
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setIsLoggedIn(true);
      setUserId(localStorage.getItem('userId') || "");
    }
  }, []);
  
  
  return (
    <div className="h-screen w-screen">
      {isLoggedIn ? (
        <Mainpage userId={userId} onLogout={logoutUser}/>
      ) : (
        <Login onLogin={loginUser} />
      )}
    </div>
  )
}
