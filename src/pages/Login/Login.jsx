import React, { useContext } from "react";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const Login = () => {

  const {signIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) =>{
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      // console.log(email,password);
      signIn(email,password)
      .then(result =>{
        const user = result.user;
        // console.log(user);
        navigate(from, {replace: true})
      })
      .then(error => console.log(error))
  }

  return (
    <div className="hero min-h-full my-14 bg-base-200">
      <div className="hero-content flex-col gap-16 lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="font-bold text-center text-3xl">Login</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-error" type="submit" value="Login" />
              </div>
              <p>New in Car Doctor ?<Link to='/signup'>Create Account</Link> </p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
