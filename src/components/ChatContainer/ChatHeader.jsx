import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { useAuthStore } from '../../store/useAuthStore';
import { X } from 'lucide-react';

export default function ChatHeader() {
    const {selectedUser , setSelectedUser}= useChatStore();
    const {onlineUsers}= useAuthStore() 
  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <div className="avatar">
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || "/public/avatar.webp"} alt={selectedUser.fullName} />
                    </div>
                </div>
                {/* user info */}
                <div >
                    <h3 className='font-medium '>{selectedUser.fullName}</h3>
                    
                   <p className='text-sm text-base-content/70'>
                   {onlineUsers.includes(selectedUser._id)?"Online":"Offline"}
                   </p>
                    
                    </div>
            </div>
            {/* close button */}
            <button className='' onClick={()=>setSelectedUser(null)}>
                <X/>
            </button>
        </div>
     
    </div>
  )
}