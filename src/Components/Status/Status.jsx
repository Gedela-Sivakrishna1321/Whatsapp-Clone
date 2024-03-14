import React from 'react'
import StatusCard from '../Status card/StatusCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Status = () => {
    const navigate = useNavigate();

  return (
    <div>
        <div className='flex h-[85vh] items-center px-[14vw] py-[7vh] '>
            {/* Left Part of status */}
            <div className='left w-[50%] lg:w-[30%] bg-[#1e262c] px-5 h-full '>

                <div className=' h-[13%]'>
                    <StatusCard/>
                </div>
                <hr />

                <div className='overflow-y-auto h-[86%] pt-2' >
                    {[1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item) => <StatusCard/>)}
                </div>

            </div>

            {/* Right Part of status */}
            <div  className='right w-[50%] lg:w-[70%] bg-[#0b141a]  h-full relative'>

                <AiOutlineClose
                onClick={() => navigate(-1)} 
                className='absolute top-5 right-10 text-xl cursor-pointer text-white' />

            </div>
        </div>
    </div>
  )
}

export default Status