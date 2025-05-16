import axios from 'axios';

const api = axios.create({
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});

export default api;