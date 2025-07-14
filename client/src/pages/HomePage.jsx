import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

    const { selectedUser } = useContext(ChatContext)

    return (
        <div className='w-full h-screen sm:px-[10%] sm:py-[3%] p-2'>
            <div className={`
                border-2 border-gray-600 rounded-2xl overflow-hidden h-full 
                grid grid-cols-1 bg-white/5
                ${selectedUser 
                    ? 'md:grid-cols-[1fr_0.5px_1.5fr_0.5px_1fr] xl:grid-cols-[1fr_0.5px_2fr_0.5px_1fr]' 
                    : 'md:grid-cols-[1fr_0.5px_2fr]'}
            `}>

                {/* Sidebar */}
                <Sidebar />

                {/* Divider (hidden in mobile) */}
                <div className='hidden md:block bg-black/20 h-full w-[0.5px]' />

                {/* ChatContainer */}
                <ChatContainer />

                {/* Divider between ChatContainer and RightSidebar only when selectedUser exists */}
                {selectedUser && (
                    <>
                        <div className='hidden md:block bg-black/20 h-full w-[0.5px]' />
                        <RightSidebar />
                    </>
                )}

            </div>
        </div>
    )
}

export default HomePage
