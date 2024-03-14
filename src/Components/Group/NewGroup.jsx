import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { createGroupChat } from '../../Redux/Chat/Action';

const NewGroup = ({handleBackFromNewGroup, groupMember, setIsGroup}) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [groupName, setGroupName] = useState();
    const [groupImage, setGroupImage] = useState();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    function handleCreateGroup() {
        let userIds = [];

        for (let user of groupMember)
            userIds.push(user.id)

        const group = {
            userIds,
            chat_name : groupName,
            chat_image : groupImage
        }

        const data = {
            group,
            token
        }

        dispatch(createGroupChat(data));
        setIsGroup(false);
    }

    function uploadToCloudinary(pic) {
        setIsImageUploading(true);
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
            setGroupImage(resData.url);
            console.log("IMG_URL - ", resData.url);
            console.log("TempProfile - ", groupImage);
            setIsImageUploading(false);
          })
    }

  return (
    <div className='w-full h-full'>
        {/* Top Part */}
        <div className='flex items-center space-x-10 pt-16 pb-5 px-10 bg-[#008069] text-white' >
            <BsArrowLeft className='cursor-pointer font-bold text-2xl' onClick={handleBackFromNewGroup} />
            <p className='text-xl font-semibold' >New Group</p>
        </div>

        {/* Group Profile Part */}
        <div className='flex flex-col justify-center items-center my-12' >
 
            <label htmlFor="imgInput" className='relative'>
                <img
                 className='w-[15vw] h-[15vw] rounded-full cursor-pointer'
                 src={groupImage || "https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=600"}
                 alt="" />
                 {isImageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]' />}
            </label>
            
    
            <input
             type="file" 
             id="imgInput"
             className='hidden'
             onChange={(e) => uploadToCloudinary(e.target.files[0])}
             />

        </div>

        {/* Group Name */}
        <div className='w-full flex justify-between items-center py-2 px-5'>
            <input 
            className='w-full outline-none border-b-2 border-green-700 px-2 bg-transparent'
            type="text"
            placeholder='Group Subject'
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
            />
        </div>

        {/* Create Group Button */}
        {groupName && 
            <div className='py-5 bg-slate-200 flex items-center justify-center' >
                <Button onClick={handleCreateGroup}>
                    <div className='bg-[#0c977d] p-4 rounded-full' >
                        <BsCheck2  className='text-white text-3xl font-bold' />
                    </div>
                </Button>
            </div>
        }

    </div>
  )
}

export default NewGroup