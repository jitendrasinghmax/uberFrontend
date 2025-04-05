import toast from "react-hot-toast"

 export default {
        sucess:(msg:string)=>toast.success(msg),
        error:(msg:string)=>toast.error(msg)
    }

