import React,{useState} from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const input = ({value,label,placeholder,onChange,type}) => {
    const [showPassword,setShowPassword]=useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label className="text-[13px] text-slate-800">{label}</label>
        <div className='input-box'>
            <input
            type={type=='password'? showPassword ? 'text': 'password' : type }
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            className='w-full outline-none bg-transparent'
            value={value}
            />
            {type === "password" && (
              <>
              {showPassword ?(
                <FaRegEye
                size={22}
                className=" text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
                />
              ):(
                <FaRegEyeSlash
                size={22}
                className=" text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
                />
              )}
              </>
            )}
        </div>
    </div>
  )
}

export default input