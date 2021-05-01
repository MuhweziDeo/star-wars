import Axios from 'axios';
import { BASE_API_URL } from "../config";

const axios = Axios.create({baseURL: BASE_API_URL});

export default axios;