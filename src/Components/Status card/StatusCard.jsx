import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusCard = () => {
    const navigate = useNavigate();
  return (
    <div className='flex items-center p-3 cursor-pointer  ' onClick={() => navigate('/status/{userId}')} >
        <div>
            <img 
            className='w-7 h-7 lg:h-10 lg:w-10 rounded-full'
            src="https://cdn.pixabay.com/photo/2016/12/06/18/49/santa-claus-1887306_640.png" 
            alt="" />
        </div>

        <div className='ml-2 text-white' >
            <p>username</p>
        </div>
    </div>
  )
}

export default StatusCard