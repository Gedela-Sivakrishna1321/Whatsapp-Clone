import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { FaEllipsisVertical } from "react-icons/fa6";
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from 'react-icons/bs'
import ChatCard from './ChatCard/ChatCard'
import MessageCard from './MessageCard/MessageCard'
import './HomePage.css'
import Profile from './Profile/Profile'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material'
import CreateGroup from './Group/CreateGroup'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, searchUser } from '../Redux/Auth/Action'
import { createChat, getUsersChat } from '../Redux/Chat/Action'
import { createMessage, getAllMessages } from '../Redux/Message/Action'

const HomePage = () => {

  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector(store => store)
  const token = localStorage.getItem("token");
  // console.log("Auth.searchUser - ", auth.searchUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSearch(keyword) {
    dispatch(searchUser({ keyword, token }));
    
  }

  function handleCreateMessage() {
      dispatch(createMessage({token, data : {chatId : currentChat.id, content : content}}))
  }

  // function handleCreateChat({userId}) {

  // }

  function handleClickOnCurrentChat(userId) {
    // setCurrentChat(true);
    dispatch(createChat({ token, data: { userId } }))
    setQueries("");
  }

  useEffect(() => {
    dispatch(getUsersChat({ token }))
  }, [chat.createChat])

  function handleNavigate() {
    setIsProfile(true);
  }

  function handleProfileOpenClose() {
    setIsProfile(false);
  }

  function handleCreateGroup() {
    setIsGroup(true);
  }

  function handleBackFromCreateGroup() {
    setIsGroup(false);
  }

  function handleLogout() {
    dispatch(logoutAction());
    //  navigate("/signup");
  }

  useEffect(() => {
    if (!auth.reqUser)
      navigate("/signup")
  }, [auth.reqUser])

  function handleCurrentChat(item) {
    setCurrentChat(item);
  }

  console.log("Current chat - ",currentChat);
  console.log("Current chats - ", chat.chats)

  useEffect(()=>{
    if(currentChat?.id)
    dispatch(getAllMessages({chatId : currentChat.id, token}))
  },[currentChat, message.newMessage])


  return (
    <div className='relative'>
      <div className='py-14 bg-[#00a884] w-full' ></div>

      <div className='absolute flex bg-[#f0f2f5] h-[90vh] top-8 left-6 w-[95vw]' >
        <div className='left w-[30%] h-full bg-[#e8e9ec]' >

          {isGroup && <CreateGroup setIsGroup={setIsGroup} handleBackFromCreateGroup={handleBackFromCreateGroup} />}

          {!isProfile && !isGroup && <div className='w-full'>

            <div className='flex justify-between items-center p-3'>
              <div onClick={handleNavigate} className='flex items-center space-x-3 cursor-pointer'>
                <img
                  className='rounded-full h-10 w-10 '
                  src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                  alt="" />

                <p className=''>{auth.reqUser?.full_name}</p>
              </div>

              <div className='text-2xl flex space-x-3 '>
                <TbCircleDashed className='cursor-pointer' onClick={() => navigate('/status')} />
                <BiCommentDetail />
                <div className='relative'>
                  <FaEllipsisVertical
                    className='cursor-pointer'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  />


                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    className='absolute top-42'
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>

                </div>
              </div>
            </div>

            <div className='relative flex justify-center items-center bg-white py-4 px-3 '>
              <input
                type="text"
                className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                placeholder='Search or start new chat'
                onChange={(e) => {
                  setQueries(e.target.value)
                  handleSearch(e.target.value)
                }}
                value={queries}
              />

              <AiOutlineSearch className='absolute left-5 top-7' />

              <div>
                <BsFilter className='ml-4 text-3xl' />
              </div>

            </div>

            <div className='bg-white overflow-y-auto h-[68vh] px-3 '>
              {queries
                &&

                auth.searchUser.map((item) =>
                  <div onClick={() => handleClickOnCurrentChat(item.id)} >
                   <ChatCard 
                              name={item.full_name}
                              userImg = {
                                item.profile_picture || 
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                              }
                              />
                  </div>)}

                {/* This displays all the chats of the req user */}
              {chat.chats.length > 0
                && !queries &&

                chat.chats?.map((item) =>
                  <div onClick={() => handleCurrentChat(item)} >
                            {item.is_group ? (
                              <ChatCard 
                              name={item.chat_name}
                              userImg = {
                                item.chat_image || 
                                "https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_640.png"
                              }
                              />
                            )
                             : 
                             (
                              <ChatCard 
                              name={
                                auth.reqUser?.id !== item.users[0]?.id ? item.users[0].full_name : item.users[1].full_name
                              }
                              userImg = {
                                auth.reqUser?.id !== item.users[0]?.id ? item.users[0].profile_picture ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"  : item.users[1].profile_picture ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                              }
                              />
                             )}
                  </div>)}
            </div>

          </div>}

          {isProfile &&
            <div className='w-full h-full' >
              <Profile handleProfileOpenClose={handleProfileOpenClose} />
            </div>
          }

        </div>

        {/* Default chat Page */}
        {!currentChat && <div className='right w-[70%]' >
          <div className=' flex flex-col items-center justify-center h-full '>
            <div className='w-full text-center'>

              <div className='w-full'>
                <img
                  src="https://web.whatsapp.com/img/native-desktop-hero_a22b846aefcd2de817624e95873b2064.png"
                  alt="" />
              </div>
              <h1 className='text-4xl text-gray-600'>WhatsApp web</h1>
              <p className='my-9'>Make calls, share your screen and
                get a faster experience when you download the Windows app.</p>
            </div>
          </div>
        </div>}

        {/* Chat Page */}
        {currentChat &&
          <div className='w-[70%] relative'>

            {/* Header Part */}
            <div className='header absolute top-0 w-full bg-[#f0f2f5]'>

              <div className='flex justify-between'>
                <div className='py-3 px-3 space-x-4 flex items-center'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={currentChat.is_group ? currentChat.chat_image || "https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_640.png" : (auth.reqUser?.id !== currentChat.users[0]?.id ? currentChat.users[0].profile_picture ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"  : currentChat.users[1].profile_picture ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")
                  }
                    alt="" />
                  <p>
                 { currentChat.is_group ? currentChat.chat_name :  (auth.reqUser?.id !== currentChat.users[0]?.id ? currentChat.users[0].full_name : currentChat.users[1].full_name)}
                  </p>
                </div>

                <div className='py-3 px-3 space-x-4 flex items-center'>
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>

            </div>

            {/* Message Part */}
            <div className='px-10 h-[85vh] overflow-y-auto  bg-blue-200' >
              <div className='space-y-1 flex flex-col justify-center mt-20 py-2'>
                { message.messages?.length >0 && message.messages?.map((item, i) => <MessageCard isReqUserMessage={item.user.id === auth.reqUser.id} content={item.content} />)}
              </div>
            </div>

            {/* Footer Part */}
            <div className='footer absolute bottom-0 w-full py-3 text-2xl bg-[#f0f2f5] '>

              <div className='flex justify-between items-center px-5 relative'>

                <BsEmojiSmile className='cursor-pointer' />
                <ImAttachment />


                <input
                  className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]'
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Type message'
                  value={content}
                  onKeyPress={
                    (e) => {
                      if (e.key === "Enter") {
                        handleCreateMessage();
                        setContent("");
                      }
                    }
                  }
                />

                <BsMicFill />

              </div>

            </div>

          </div>
        }

      </div>
    </div>
  )
}

export default HomePage