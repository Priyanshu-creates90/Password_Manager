import React from 'react'

const navbar = () => {
  return (
    <nav  className='bg-slate-800  text-white '>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className='logo font-bold text-white text-2xl'>
             <span className='text-green-500'>&lt;</span>
            Pass<span className='text-green-500'>Op/&gt;</span> 
            
            </div>
        
        {/* <ul>
            <li className='flex gap-4'>
                <a href='/' className='hover:font-bold'>Home</a>
                <a href='/' className='hover:font-bold'>About</a>
                <a href='/' className='hover:font-bold'>Contact</a>
            </li>
        </ul> */}
        <button className='text-white bg-green-600 my-5 mx-2 rounded-full flex justify-between items-center ring-1 ring-white ' >
            <img className='invert w-10 p-1' src='icons/github.svg' width={30} alt='github'/>
           <span className=' font-bold px-2'>GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default navbar
