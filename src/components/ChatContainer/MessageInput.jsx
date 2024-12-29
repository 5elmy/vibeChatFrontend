// import React, { useRef, useState } from 'react'
// import { useChatStore } from '../../store/useChatStore';
// import { Image, Send, X } from 'lucide-react';

// export default function MessageInput() {
//     const [text,setText]= useState("");
//     const [imagePreview , setImagePreview]= useState(null)
//     const fileInputRef = useRef(null)
//     const {sendMessage}= useChatStore()
//     // const handleImageChange = (e)=>{}
//     // const removeImage= ()=>{};
//     // const handleSendMessage = async (e)=>{}
//         const handleImageChange = (e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onload = () => setImagePreview(reader.result);
//               reader.readAsDataURL(file);
//             }
//           };
        
//           const removeImage = () => {
//             setImagePreview(null);
//             if (fileInputRef.current) {
//               fileInputRef.current.value = ""; // Reset the file input
//             }
//           };
        
//           const handleSendMessage = async (e) => {
//             e.preventDefault();
//             if (text.trim() || imagePreview) {
//               await sendMessage({ text, image: imagePreview });
//               setText(""); // Clear text input
//               removeImage(); // Clear image preview and file input
//             }
//           };
//   return (
//     <div className='p-4 w-full'>
//         {imagePreview && (
//             <div className='mb-3 flex items-center gap-2'>
//                 <div className='relative'>
//                     <img src={imagePreview} alt='preview' 
//                     className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
//                     />
//                     <button 
//                     onClick={removeImage}
//                     className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
//                     flex items-center justify-center
//                     '
//                     type='button'
//                     >
//                      <X className='size-3'/>
//                     </button>
//                 </div>
//             </div>
//         )}
      
//       <form onSubmit={handleSendMessage}  className='flex items-center gap-2'>
//         <div className='flex-1 flex gap-2'>
//             <input
//             type='text'
//             className='w-full input input-bordered  rounded-lg input-sm sm:input-md'
//             placeholder='Type a message...'
//             // value={text}
//             onChange={(e)=>setText(e.target.value)}
//             />


//             <input
//             type='file'
//             accept='image/*'
//             className="hidden"
//             ref={fileInputRef}
//             value={text}
//             onChange={handleImageChange}
//             />
//             <button type='button'
//             onClick={()=>fileInputRef.current?.click()}
//             className={`hidden sm:flex btn btn-circle ${imagePreview ?"text-emerald-500":"text-zinc-400"}`}
//             >
//                 <Image size={20} />
//             </button>
//         </div>
//         <button 
//         type='submit'
//         className='btn btn-sm btn-circle'
//         disabled={!text.trim() && !imagePreview}
//         >
//           <Send size={22}/>
//         </button>
//       </form>
//     </div>
//   )
// }


import React, { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Reset the file input
//     }
//   };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (text.trim() || imagePreview) {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText(""); // Clear text input
      removeImage(); // Clear image preview and file input
    }
  };

const handleImageChange = (e)=>{
    const file  = e.target.files[0];
    if(!file.type.startsWith("image/")){
        toast.error("please select an imagr file")
        return ;
    }
    const reader = new FileReader();
    reader.onloadend= ()=>{
        setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);

}
      const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };
    // const handleSendMessage = async (e)=>{}

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* Text input */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* File input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange} // No value binding here
          />

          {/* Image upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
