import axios from "axios"
import { BaseUrl } from "../Constant/BaseUrl"



export const axiosInstance =axios.create({
    baseURL:`${BaseUrl}`,
    withCredentials:true
})