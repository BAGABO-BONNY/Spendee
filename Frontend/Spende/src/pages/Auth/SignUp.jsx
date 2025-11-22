import React,{useState} from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/inputs/profilePhotoSelector';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp= async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the Password ");
      return;
    }
    setError("");
    // Login API call
  };
  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black '>Create an account</h3>
        <p className='text-md text-slate-700 mt-[5pxx] mb-6'>
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp} >
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
          <div className='col-span-2'>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 characters"
            label="Password"
            type="password"
          />
          </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp