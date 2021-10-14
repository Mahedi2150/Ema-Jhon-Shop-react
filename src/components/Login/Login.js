import React from 'react';
import { Link , useLocation,useHistory} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import"./login.css"
const Login = () => {
    const { signInUsingGoogle } = useAuth();
    const location = useLocation()
    const redirect_url =location.state?.from || '/shop'
    const history = useHistory()

    const handleGoogleSignIn = () => {
        signInUsingGoogle()
        .then(result => {
            history.push(redirect_url)
        })
    }
    return (
        <div className="login-form">
            <div>
                <h2>Log in</h2>
                <form onSubmit="">
                    <input type="email" name="" id="" placeholder="Enter your email" />
                    <br />
                    <input type="password" name="" id="" placeholder="Enter your Password" />
                    <br />
                    <input type="submit" value="submit" />
                </form>
                <p>New to ema john? <Link to="/register">Create Account </Link></p>
                <div>------------ or -----------</div>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn-regular">Google Sign In</button>
            </div>
        </div>
    );
};

export default Login;