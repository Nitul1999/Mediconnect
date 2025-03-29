const {default: axiosInstance} =require('.')

export const adminlogin = async(payloads)=> {
    try {
        const response = await axiosInstance.post('/api/admin/login',payloads)
        return response.data
    } catch (error) {
        return error.response.data
    }
}