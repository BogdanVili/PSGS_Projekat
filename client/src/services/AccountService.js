import axios from 'axios';

export const GetUserAccount = async (username, password) => 
{
    return await axios.post(`${process.env.API_URL}/account/login`, {username: username, password: password});
}
 
