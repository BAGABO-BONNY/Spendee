import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/profilePhotoSelector";
import { useUser } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useUser();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const result = await register(fullName, email, password, profilePic);
    setLoading(false);

    if (result.success) {
      if (profilePic) {
        try {
          const formData = new FormData();
          formData.append('profileImage', profilePic);
          await axiosInstance.post(API_PATHS.auth.uploadProfile, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (uploadError) {
          console.log('Profile image upload failed, but registration was successful');
        }
      }
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black ">
          Create an account
        </h3>
        <p className="text-xl text-slate-700 mt-[5pxx] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&_label]:text-lg [&_label]:font-bold">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Enter your full name"
              label="Full Name"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"
              label="Email address"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Min 8 characters"
                label="Password"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'SIGNING UP...' : 'SIGN UP'}
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
