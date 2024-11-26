"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import "./Login.css";

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
    const router = useRouter(); // Initialize useRouter

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setErrorMessage(null); // Reset error message when toggling between forms
    };

    const showSignUpForm = () => {
        setIsSignUp(true);
        setErrorMessage(null); // Reset error message when showing sign up form
    };

    useEffect(() => {
        const textElement = document.getElementById('gradient-text');
        if (textElement) {
            applyGradient(textElement, 'red', 'black');
        }
    }, []);

    const handleSignIn = () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        if (username === "test" && password === "test123") { // Mock validation
            router.push("/profileComponent"); // Redirect to /profileComponent
        } else {
            setErrorMessage("Incorrect username or password");
        }
    };

    return (
        <>
            <div>
            
            </div>
            <div className="header">
                <h2 className="logo" id="gradient-text">PeerPAWS</h2>
                <nav className="navigation">
                    <a className="link" href="contact.html">Contact</a>
                    <button className="shadow__btn" onClick={showSignUpForm}>Create Account</button>
                </nav>
            </div>
            <div className="contents">
                <br />
                <div className="form-container">
                    <p id="form-title" className="title">{isSignUp ? "Sign Up" : "Login"}</p>

                    {errorMessage && !isSignUp && (
                        <p className="error-message">{errorMessage}</p>
                    )}

                    <form id="auth-form" className="form">
                        {isSignUp ? (
                            <>
                                <div className="input-group">
                                    <label htmlFor="id-number">UGA Id#</label>
                                    <input type="text" name="id-number" id="id-number" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" />
                                </div>
                                <br />
                                <button className="sign" type="button">Sign Up</button>
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" />
                                    <div className="forgot">
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </div>
                                <button className="sign" type="button" onClick={handleSignIn}>Sign In</button>
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
                        <img src="UGAlogo.png" alt="University of Georgia Logo" className="uga-logo" />
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
