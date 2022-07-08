import { APIInstance } from "@/api";

export const AuthAPI = {
    /**
     * 
     * @param {string} login 
     * @param {string} password 
     * @returns 
     */
    login(login, password){
        const url = "user/login";
        const data = {login, password};
        return APIInstance.post(url, data)
    }
}