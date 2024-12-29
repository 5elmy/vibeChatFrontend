 import {create} from "zustand"
import { axiosInstance } from "../Api/axios"
import { BaseUrl } from "../Constant/BaseUrl"
import toast from "react-hot-toast";
import { io } from "socket.io-client";


 export const useAuthStore = create((set , get)=>({
    authUser:null,
    isSigningUp:false,
    isloggingIn:false ,
    isUpdatingProfile:false ,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get(`${BaseUrl}/auth/check`);
            console.log(res);
            console.log( res.data);
             set({authUser:res.data})
             get().connectSocket()
            
        } catch (error) {
            console.log({error});
            
            console.log(`Error in Checkauth : ${error}`);
            set({authUser:null})
        }finally{
            
            set({isCheckingAuth:false})
        }
    },
    register:async(data)=>{
        console.log({data});
        
       set({isSigningUp:true})
        try {
            const res = await axiosInstance.post(`${BaseUrl}/auth/signup` , data)
            console.log({res});
            set({authUser:res.data.results})
            toast.success("Account Created Successfully")
            get().connectSocket()
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            console.log(`error in signup :${error}`)
        } finally{
            set({isSigningUp:false})
        }
    }, 
    // logOut:async()=>{
    //    try {
    //     await axiosInstance.post(`${BaseUrl}/auth/signout`)
    //     set({authUser:null});
    //     toast.success("Logged out successfully")
    //     get().disconnectSocket()
    //     console.log(get().disconnectSocket());
        
    //    } catch (error) {
    //     toast.error(error.response.data.message)
    //    }
    // },
    
    logOut: async () => {
        try {
            await axiosInstance.post(`${BaseUrl}/auth/signout`);
            get().disconnectSocket(); // Disconnect socket first
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging out");
        }
    },
    
    login: async(data)=>{
        console.log({login:data});
        
        set({isloggingIn:true})
        try {
            const res = await axiosInstance.post(`/auth/signin` , data)
            console.log({res});
            set({authUser:res.data.results})
            toast.success("logged in  Successfully")
            get().connectSocket()
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            console.log(`error in signin :${error}`)
        } finally{
            set({isloggingIn:false})
        }
    },
    updateProfile:async (data)=>{
        set({isUpdatingProfile:true})
        try {
            let res = await axiosInstance.put(`/auth/update-profile`,data)
            set({authUser:res.data.results})
            toast.success("Profile  updated successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            console.log(`error in update profile :${error}`)
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    
    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return ;
        const socket = io(BaseUrl.replace("/api", ""),{query:{
            userId:authUser._id
        }})
        socket.connect();
        set({socket:socket})
        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect(); 
            console.log("Socket disconnected");
        }
        set({socket: null}); 
    },
    
 }))