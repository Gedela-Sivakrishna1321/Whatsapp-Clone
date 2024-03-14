import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineRight } from 'react-icons/ai';
import SelectedMember from './SelectedMember';
import ChatCard from '../ChatCard/ChatCard';
import NewGroup from './NewGroup';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/Action';

const CreateGroup = ({ handleBackFromCreateGroup, setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector(store => store);

  // Remove group members 
  function handleRemoveMember(item) {
    groupMember.delete(item);
    setGroupMember(groupMember);
  }

  function handleSearch(e) {
    setQuery(e.target.value);
    dispatch(searchUser({ keyword : query, token }));
  }

  function handleBackFromNewGroup() {
    setNewGroup(false);
  }

  return (
    <div className='h-full w-full'>

      {!newGroup &&
        <div>
          <div className='flex items-center bg-[#008069] pt-16 pb-5 px-10 space-x-10 text-white '>
            <AiOutlineArrowLeft className='cursor-pointer text-2xl' onClick={handleBackFromCreateGroup} />
            <p className='font-semibold'>Add Group Participants</p>
          </div>

          <div className='bg-white  relative py-4 px-3' >
            <div className='flex flex-wrap space-x-2 space-y-1'>
              {groupMember.size > 0 && Array.from(groupMember).map((item) => <SelectedMember member={item} handleRemoveMember={() => { handleRemoveMember(item) }} />)}
            </div>

            <input
              type="text"
              className='outline-none border-b border-[#8888] p-2 w-[93%]'
              placeholder='Search user'
              onChange={(e) => {
                handleSearch(e)
              }}
              value={query}
            />
          </div>

          <div className='bg-white overflow-y-auto h-[50.2vh]' >
            {auth.searchUser.length > 0 &&

              auth.searchUser?.map((item) =>

                <div onClick={() => {
                  groupMember.add(item);
                  setGroupMember(groupMember);
                  setQuery("")
                }}

                  key={item?.id}
                >
                  <hr />
                  <ChatCard userImg={item.profile_picture} name={item.full_name} />
                </div>)}
          </div>

          <div className='flex items-center justify-center bottom-10 py-5 bg-slate-200' >
            <div className='bg-green-600 rounded-full p-4 cursor-pointer'
              onClick={() => setNewGroup(true)}
            >
              <AiOutlineRight
                className='text-white font-bold text-3xl'
              />
            </div>
          </div>
        </div>
      }

      {newGroup &&
        <NewGroup setIsGroup={setIsGroup} groupMember={groupMember} handleBackFromNewGroup={handleBackFromNewGroup} />
      }

    </div>
  )
}

export default CreateGroup