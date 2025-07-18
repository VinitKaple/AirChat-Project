import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

    const { getUsers, users, selectedUser, setSelectedUser,
        unseenMessages, setUnseenMessages } = useContext(ChatContext);

    const { logout, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState(false)

    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    return (
        <div className={`bg-transparent h-full p-5 rounded-r-xl overflow-y-scroll text-black ${selectedUser ? "max-md:hidden" : ''}`}>

            {/* Logo and Menu */}
            <div className='pb-5'>
                <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
        <img src={assets.chatIcon} alt="logo" className='max-w-8' />
        <h1 className='text-xl font-semibold'>AirChat</h1>
    </div>
                    <div className="relative py-2 group">
                     <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer filter invert' />

                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-white border border-black/20 text-black shadow-md hidden group-hover:block'>
                            <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:underline'>Edit Profile</p>
                            <hr className="my-2 border-t border-black/20" />
                            <p onClick={() => logout()} className='cursor-pointer text-sm hover:underline'>Logout</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='bg-white/10 border border-black/20 rounded-full flex items-center gap-2 py-3 px-4 mt-5 shadow-sm'>
                    <img src={assets.search_icon} alt="Search" className='w-3' />
                    <input onChange={(e) => setInput(e.target.value)} type="text"
                        className='bg-transparent border-none outline-none text-black text-xs placeholder-black flex-1'
                        placeholder='Search User...' />
                </div>

            </div>

            {/* Users List */}
            <div className='flex flex-col'>
                {filteredUsers.map((user, index) => (

                    <div onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
                        ${selectedUser?._id === user._id ? 'bg-black/10' : 'hover:bg-black/5'}`}>

                        <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full' />

                        <div className='flex flex-col leading-5'>
                            <p>{user.fullName}</p>
                            {
                                onlineUsers.includes(user._id)
                                    ? <span className='text-green-500 text-xs'>Online</span>
                                    : <span className='text-gray-500 text-xs'>Offline</span>
                            }
                        </div>

                        {unseenMessages[user._id] > 0 &&
                            <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-orange-400 text-white'>
                                {unseenMessages[user._id]}
                            </p>
                        }
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Sidebar
