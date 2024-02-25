import React from 'react'

type Props = {}

const BranchCards = (props: Props) => {
  return (
    <div className='border border-gray-200 bg-gray-100  
    shadow-lg rounded-lg  h-full flex justify-between mt-[4rem]'>
        
            <div className='border border-gray-200 bg-white
              shadow-lg rounded-lg flex items-stretch w-[20rem] h-[15rem]'>
              <div className='rounded-lg shadow-xl shadow-gray-400 self-start ml-9 mt-2'>
              <img className='rounded-lg' src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708845036/pswzjlxoj90guqswls8u.avif" alt="" />
              </div>
              <div className='self-end border border-gray-200 '>
                <p>Şube</p>
              </div>
            </div>
            <div className='border border-gray-200 bg-white
              shadow-lg rounded-lg flex justify-items-stretch items-stretch w-[20rem] h-[15rem]'>
            <div className='rounded-lg shadow-xl shadow-gray-400 self-start ml-9 mt-2'>
              <img className='rounded-lg' src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708845036/pswzjlxoj90guqswls8u.avif" alt="" />
              </div>
              <div className='self-center justify-self-center border border-gray-200 mt-9'>
                <p>Şube2</p>
              </div>
            </div>
            <div className='border border-gray-200 bg-white
              shadow-lg rounded-lg flex items-stretch w-[20rem] h-[15rem]'>
            <div className='rounded-lg shadow-xl shadow-gray-400 self-start ml-9 mt-2'>
              <img className='rounded-lg' src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708845036/pswzjlxoj90guqswls8u.avif" alt="" />
              </div>
              <div className='self-end border border-gray-200 '>
                <p>Şube3</p>
              </div>
            </div>
        
    </div>
  )
}

export default BranchCards