import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState,  } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import gambar from "../../assets/login.svg";

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           navigate("/");
        })
        .catch((error) => {
            alert("Password or Email invalid");
        });
    }
    return(
        <div className="sign-in-container">
            <img src={gambar} alt="Deskripsi Gambar" />
            <form onSubmit={signIn}>
                <h1>Log In to your account</h1>
                <input 
                type="email" 
                placeholder="Enter you email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Log In</button>
                <p>
                    Have no account?
                    <Link to="/SignUp" style={{textDecoration: "none"}}>
                        {" "}
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;