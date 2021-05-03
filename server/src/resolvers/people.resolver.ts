import { People, PeopleResponse } from "../models/people.model";
import axios from "../plugins/axios";

export const getPeople = async (_parent:any, args: {page?: number}): Promise<PeopleResponse> => {
    const {data} = await axios.get(`people?page=${args.page || 1}`);
    return data;
};

export const getPersonDetails = async (parent: any, args: {personId: number}): Promise<People> => {
    const {data} = await axios.get(`people/${args.personId}`);
    return data;
};