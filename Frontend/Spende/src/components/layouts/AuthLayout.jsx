import React from "react";
import CARD_2 from "../../assets/images/card2.png"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">SPENDEE</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className=" w-48 h-48 rounded-40px bg-emerald-800 absolute -top-7 -left-5"/>
        <div className=""/>
        <div className=""/>
        <img src={CARD_2} alt="Spendee visualization" className="" />
      </div>
    </div>
  );
};

export default AuthLayout;
