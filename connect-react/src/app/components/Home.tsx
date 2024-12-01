"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Login.css";
import { doCredentialLogin } from "./signInComponent";

interface LoginProps {
  onSignIn: () => void;
}

function applyGradient(textElement: HTMLElement, startColor: string, endColor: string) {
  const text = textElement.innerText;
  const length = text.length;

  textElement.innerText = '';
  for (let i = 0; i < length; i++) {
    const span = document.createElement('span');
    span.innerText = text[i];

    const ratio = i / (length - 1);
    const red = Math.round((1 - ratio) * 255);
    const green = Math.round((1 - ratio) * 0);
    const blue = Math.round((1 - ratio) * 0);

    span.style.color = `rgb(${red}, ${green}, ${blue})`;
    textElement.appendChild(span);
  }
}

export default function Login({ onSignIn }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(null);
  };

  const showSignUpForm = () => {
    setIsSignUp(true);
    setErrorMessage(null);
  };

  useEffect(() => {
    const textElement = document.getElementById('gradient-text');
    if (textElement) {
      applyGradient(textElement, 'red', 'black');
    }
  }, []);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const myid = formData.get("id-number") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!myid || !username || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myid, username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      setErrorMessage(null);
      router.push("/profileComponent");
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrorMessage("Username and password are required!");
      return;
    }

    try {
      const response = await doCredentialLogin(formData);

      if (response.error) {
        setErrorMessage("Invalid credentials. Please try again.");
        return;
      }

      setErrorMessage("Successful!");
      router.push("/profileComponent");
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again later.");
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div>
        <video autoPlay loop muted playsInline className="back-video">
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="header">
        <h2 className="logo" id="gradient-text">UGAConnect</h2>
        <nav className="navigation">
          <a className="link" href="contact.html">Contact</a>
          <button className="shadow__btn" onClick={showSignUpForm}>Create Account</button>
        </nav>
      </div>
      <div className="contents">
        <br />
        <div className="form-container">
          <p id="form-title" className="title">{isSignUp ? "Sign Up" : "Login"}</p>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <form
            id="auth-form"
            className="form"
            onSubmit={isSignUp ? handleSignUp : handleLogin}
          >
            {isSignUp ? (
              <>
                <div className="input-group">
                  <label htmlFor="id-number">UGA Id#</label>
                  <input type="text" name="id-number" id="id-number" required />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" required />
                </div>
                <br />
                <button className="sign" type="submit">Sign Up</button>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="username">Email</label>
                  <input type="text" name="email" id="email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" required />
                  <div className="forgot">
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
                <button className="sign" type="submit">Sign In</button>
              </>
            )}
          </form>
          <br />
          <p id="toggle-auth" className="signup">
            {isSignUp ? "Already have an account?" : "Don't have an account? "}
            <a href="#" className="bold" onClick={toggleForm}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
      <footer className="uga-footer">
      <div className="footer-content">
                    <div className="footer-left">
                        <img src="/UGAlogo.png" alt="University of Georgia Logo" className="uga-logo" />
                        <p>&copy; University of Georgia, Athens, GA 30602</p>
                        <p>706-542-3000</p>
                    </div>
                    <div className="footer-center">
                        <a href="#">Schools and Colleges</a>
                        <a href="#">Directory</a>
                        <a href="#">MyUGA</a>
                    </div>
                    <div className="footer-right">
                        <a href="#">Employment Opportunities</a>
                        <a href="#">Copyright and Trademarks</a>
                        <a href="#">Privacy</a>
                        <a href="#">Website Feedback</a>
                        <a href="#">Human Trafficking Notice</a>
                        <a href="#">Reporting Hotline</a>
                    </div>
                </div>
                <div className="social-media">
                    <a href="#">#UGA</a>
                    <a href="https://x.com/universityofga"><i className="fab fa-twitter" style={{ fontSize: '24px', color: 'lightskyblue' }}></i></a>
                    <a href="https://www.instagram.com/universityofga/"><i className="fab fa-instagram" style={{ fontSize: '24px', color: 'red' }}></i></a>
                    <a href="https://www.linkedin.com/school/university-of-georgia/posts/?feedView=all"><i className="fab fa-linkedin" style={{ fontSize: '24px', color: 'blue' }}></i></a>
                </div>
      </footer>
    </>
  );
}
