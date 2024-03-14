import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../Redux/Auth/Action';


const Profile = ({ handleProfileOpenClose }) => {

  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState();
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  function handleEdit() {
    setFlag(true);
  }


  // function handleUpdateName() {
  //   const data = {
  //       token : localStorage.getItem("token"),
  //       data : {
  //           full_name : username
  //       }
  //   }
  //   dispatch(updateUser(data))
  // }

  function handleCheckClick() {
    setFlag(false);
    const data = {
      token: localStorage.getItem("token"),
      data: {
        full_name: username
      }
    }
    dispatch(updateUser(data))
  }

  function uploadToCloudinary(pic) {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Whatsapp");
    data.append("cloud_name", "dheuqshro");
    fetch("https://api.cloudinary.com/v1_1/dheuqshro/image/upload", {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((resData) => {
        setTempPicture(resData.url);
        console.log("IMG_URL - ", resData.url);
        console.log("TempProfile - ", tempPicture);
        const data = {
          // id : auth.reqUser?.id,
          token: localStorage.getItem("token"),
          data: {
            profile_picture: resData.url,
          },
        }
        dispatch(updateUser(data));
      })



  }

  return (
    <div className='h-full w-full overflow-y-auto'>



      <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 pb-5 px-10' >
        <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleProfileOpenClose} />
        <p className='cursor-pointer font-semibold'>Profile</p>
      </div>

      {/* update profile photo */}
      <div className='flex  flex-col justify-center items-center my-12 '>
        <label htmlFor="imgInput">
          <img
            className='w-[15vw] h-[15vw] rounded-full cursor-pointer'
            src={tempPicture || auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />

        </label>

        <input onChange={(e) => uploadToCloudinary(e.target.files[0])} type="file" id="imgInput" className='hidden' />
      </div>

      {/* update name  */}
      <div className='bg-white px-3'>
        <p className='py-3' >Your Name</p>
        {!flag && <div className='flex items-center justify-between'>
          <p className='py-3' >{auth.reqUser?.full_name || 'username'}</p>
          <BsPencil onClick={handleEdit} className='cursor-pointer' />
        </div>}

        {flag &&
          <div className='flex justify-between items-center py-2'>
            <input

              onChange={(e) => setUsername(e.target.value)}
              className='w-[80%] outline-none border-b-2 border-blue-700 p-2'
              type="text"
              placeholder='Enter your name' />
            <BsCheck2 className='cursor-pointer text-2xl' onClick={handleCheckClick} />
          </div>
        }
      </div>

      <div className='px-3 ' >
        <p className='py-10' >This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
      </div>



    </div>
  )
}

export default Profile