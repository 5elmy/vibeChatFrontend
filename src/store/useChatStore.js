// import { create } from "zustand";
// import { axiosInstance } from "../Api/axios";
// import toast from "react-hot-toast";



// export const useChatStore = create((set)=>(
//     {
//         messages:[],
//         users:[],
//         selectedUser:null,
//         isUserLoading:false,
//         isMessageLoading:false,

//         getUsers:async()=>{
//             set({isUserLoading:true})
//             try {
//                  const res= await axiosInstance("/messages/users");
//                  set({users:res.data.results})
                
//             } catch (error) {
//                 toast.error(error.response.data.message)
//             }finally{
//             set({isUserLoading:false})
//             }
//         },
//         getMessages:async(userId)=>{
//             set({isMessageLoading:true})
//             try {
//                  const res= await axiosInstance(`/messages/${userId}`);
//                  set({users:res.data.results})
                
//             } catch (error) {
//                 toast.error(error.response.data.message)
//             }finally{
//             set({isMessageLoading:false})

//             }
//         },
//         // setSelectedUser:(selectedUser)=> set({selectedUser})
//         setSelectedUser: (selectedUser) => set({ selectedUser }),
//     }
// ))


import { create } from "zustand";
import { axiosInstance } from "../Api/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set ,get) => ({
  messages: [], // Stores chat messages
  users: [], // Stores the list of users
  selectedUser: null, // Currently selected user
  isUserLoading: false, // Loading state for fetching users
  isMessageLoading: false, // Loading state for fetching messages

  // Utility to update state
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  // Fetch users
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance("/messages/users");
      set({ users: res.data.results });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch users";
      toast.error(message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance(`/messages/${userId}`);
      set({ messages: res.data.results });
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch messages";
      toast.error(message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage:async (messageData)=>{
    console.log({messageData});
    
    const {selectedUser , messages} = get()
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
        set({messages:[...messages , res.data.results]});
    } catch (error) {
        console.log({error});
        
        const message = error?.response?.data?.message || "Failed to fetch users";
        toast.error(message);
        
    }
  },
//   new message between to user
  subscribeToMessages:()=>{
 const {selectedUser} =get()
 if(!selectedUser) return ;
 const socket = useAuthStore.getState().socket;
 socket.on("results" , (newMessage)=>{
    if(newMessage.senderId !== selectedUser._id) return;
    set({
        messages:[...get().messages, newMessage]
    })
 })
  },
  unsubscribeFromMessages:()=>{
    const soket = useAuthStore.getState().socket;
    soket.off("results")
  },

  // Set the selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
