import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()
    const [input, setInput] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return null;
        await sendMessage({ text: input.trim() });
        setInput("")
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Select an image file")
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return selectedUser ? (
        <div className='h-full overflow-scroll relative bg-transparent'>

            {/* Header */}
            <div className='flex items-center gap-3 py-3 mx-4 border-b border-black/30'>
                <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full border border-black/20" />
                <p className='flex-1 text-lg text-black flex items-center gap-2'>
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                </p>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7 cursor-pointer' />
                <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
            </div>

            {/* Messages */}
            <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>

                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>

                        {msg.image ? (
                            <img src={msg.image} alt="" className='max-w-[230px] border border-black/20 rounded-lg overflow-hidden mb-8' />
                        ) : (
                            <p className={`p-3 max-w-[250px] md:text-sm font-light rounded-lg mb-8 break-all 
                            ${msg.senderId === authUser._id 
                                ? 'bg-gradient-to-r from-orange-300 to-pink-300 text-black rounded-br-none' 
                                : 'bg-gray-200 text-black rounded-bl-none'}`}>
                                {msg.text}
                            </p>
                        )}

                        <div className="text-center text-xs">
                            <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full border border-black/20' />
                            <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                        </div>

                    </div>
                ))}

                <div ref={scrollEnd}></div>
            </div>

            {/* Input Area */}
          <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
    <div className='flex-1 flex items-center bg-white border border-black/30 px-4 rounded-full shadow-sm'>

  
        <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} 
            type="text" 
            placeholder="Send a message"
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-black placeholder-black bg-transparent' 
        />

        <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
         <label htmlFor="image" className="cursor-pointer mr-3">
    <img src={assets.gallery_icon} alt="Gallery" className="w-5 h-5 filter invert" />
</label>

    </div>
    

    <img onClick={handleSendMessage} src={assets.send_button} alt="Send" className="w-7 cursor-pointer hover:scale-105 transition" />
</div>


        </div>
    ) : (
        <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-transparent max-md:hidden'>
            <img src={assets.chatIcon} className='max-w-16' alt="" />
            <p className='text-lg font-medium text-black'>Chat anytime, anywhere</p>
        </div>
    )
}

export default ChatContainer
