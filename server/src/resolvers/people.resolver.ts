import axios from "../plugins/axios";

export const getPeople = async (parent:any, args: {page?: number}) => {
    const {data} = await axios.get(`people?page=${args.page || 1}`)
    return data;
}