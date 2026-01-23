import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the Password ");
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4  md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xl text-slate-700 mt-[5px] mb-6">
          Please Enter your details to login
        </p>
        <form onSubmit={handleLogin}>
        <div style={{ fontSize: '18px', fontWeight: 'semibold' }}>
  <label>Email address</label>
  <Input
    value={email}
    onChange={({ target }) => setEmail(target.value)}
    placeholder="Enter your email"
    type="text"
  />
</div>

<div style={{ fontSize: '18px', fontWeight: 'semibold' }}>
  <label>Password</label>
  <Input
    value={password}
    onChange={({ target }) => setPassword(target.value)}
    placeholder="Min 8 characters"
    type="password"
  />
</div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          <p className="text-[20px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
