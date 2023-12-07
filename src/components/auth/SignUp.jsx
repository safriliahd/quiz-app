import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState,  } from "react";
import { auth } from "../../firebase";
import "./SignIn.scss";
import gambar from "../../assets/login.svg";

const signUp = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
           console.log(userCredential)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return(
        <div className="sign-in-container">
            <img src={gambar} alt="Deskripsi Gambar" />
            <form onSubmit={signUp}>
                <h1>Create Account</h1>
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
                minLength={6} // Adding a minimum length attribute for the password
                ></input>
                <button type="submit">Sign Up</button>
                {/* <p>
                already have an account?
                    <Link to="/SignUp" style={{textDecoration: "none"}}>
                        {" "}
                        Sign In
                    </Link>
                </p> */}
            </form>
        </div>
    );
};

export default signUp;