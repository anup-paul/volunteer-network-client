import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from "react-hook-form";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { UserContext } from '../../App';



if (firebase.apps.length == -0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        success: false,
        error: ''
    })

    const [newUser, setNewUser] = useState(false);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const provider = new firebase.auth.GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, email } = res.user;
                const signInUser = {
                    isSignIn: true,
                    displayName,
                    email: email
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                setUser(error.message)
            });
    }


    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            // isFieldValid = /\$+\s+\.\s+/.test(event.target.value);
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 4;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordNumber;
        }
        if (event.target.name === "password"  || event.target.name === "confirmPassword") {

            const isCNPasswordValid = event.target.value.length > 4;
            const CNPasswordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isCNPasswordValid && CNPasswordNumber;
        }
    }


    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        //    console.log(data);

        if (newUser && data.email && data.password) {
            if(data.password === data.confirmPassword)
            {
                firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    
                    const newUser = res.user;
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.name = user.name;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    history.replace(from);
                    
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
            }
            else
            {
                const newUserInfo = { ...user }
                newUserInfo.error ="Password didn't match" ;
                newUserInfo.success = false;
                setUser(newUserInfo);

            }

        }

        if (!newUser && data.email && data.password) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(res => {

                    console.log(res)
                    const newUser = res.user;
                    const newUserInfo = { ...newUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log(errorMessage)
                });
        }

    }


    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("update userName successfully")
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-design " >

                {
                    newUser && <input type="text" name="name" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your name" />
                }
                {errors.name && <span style={{ color: "red" }} >This field is required</span>}

                <input type="text" name="email" onBlur={handleBlur} ref={register({ required: true })} placeholder="Enter your email" />
                {errors.email && <span style={{ color: "red" }} >This field is required</span>}

                <input type="password" name="password" onBlur={handleBlur} ref={register({ required: true })} placeholder="password" />
                {errors.password && <span style={{ color: "red" }} >This field is required</span>}

                {
                    newUser && <input type="password" name="confirmPassword" onBlur={handleBlur} ref={register({ required: true })} placeholder="Confirm password" />
                }
                {errors.confirmPassword && <span style={{ color: "red" }} >This field is required</span>}

                <input className="btn btn-primary" type="submit" value={newUser ? "Create your Account" : "Login your Account"} />
                <p style={{ color: "red" }} >{user.error}</p>
                {
                    user.success && <p style={{ color: "green" }}>User {newUser ? "created" : "logged in"} successfully</p>
                }

                {
                    newUser ? <p>Already have an account ? </p> : <p> Don't have an account ? </p>
                }
                {
                    <Link onClick={() => setNewUser(!newUser)} >{newUser ? "Login your account" : "Create your account"}</Link>
                }
                <br />
                <p style={{marginTop:"10px"}}><span>Or</span></p>
            </form>
            <button onClick={handleGoogleSignIn} className="btn btn-warning googleBtn" >Sign in with google</button>
        </div>
    );
};

export default Login;