import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800">
      <div className="mycontainer flex justify-between items-center px-5 md:px-4 py-5 h-14 text-white">
        <div className="logo font-bold text-2xl">
          <span className="text-green-400">&lt;</span>
           Pass
          <span className="text-green-400">OP/&gt;</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-900 p-2 hover:rounded-2xl">
          <img className="w-5 invert" src="/icons/github-sign.png" alt="" /><span>GitHub</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
