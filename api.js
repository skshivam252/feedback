import axios from 'axios';
const usersUrl = 'http://localhost:5000';

export const addFeedback = async (user) => {
    return await axios.post(`/api/add`, user);
}
