import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg => msg.image)
        )
    }, [messages])

    return selectedUser && (
        <div className={`bg-transparent text-black w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>

            <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
                <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
                    className='w-20 aspect-[1/1] rounded-full border border-black/20' />
                <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
                    {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
                    {selectedUser.fullName}
                </h1>
                <p className='px-10 mx-auto text-center'>{selectedUser.bio}</p>
            </div>

            <hr className="border-black/30 my-4" />

            <div className="px-5 text-xs">
                <p className='font-medium mb-2'>Media</p>
                <div className='max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4'>
                    {msgImages.map((url, index) => (
                        <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded hover:opacity-80 transition'>
                            <img src={url} alt="" className='h-full rounded-md border border-black/10' />
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-pink-500 text-white border-none text-sm font-medium py-2 px-20 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all'>
                Logout
            </button>
        </div>
    )
}

export default RightSidebar
