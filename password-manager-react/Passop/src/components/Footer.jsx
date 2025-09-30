import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-800 flex justify-center flex-col items-center p-1'>
      <div className="logo font-bold md:text-2xl text-white text-lg">
          <span className="text-green-400">&lt;</span>
           Pass
          <span className="text-green-400">OP/&gt;</span>
        </div>
        <div className='text-white'>Created by <span className='md:text-2xl text-lg text-red-500 font-bold'>AK</span></div>
    </footer>
  )
}

export default Footer
