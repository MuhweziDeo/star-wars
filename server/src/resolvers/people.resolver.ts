import { People, PeopleResponse } from "../models/people.model";
import axios from "../plugins/axios";

export const getPeople = async (_parent:any, args: {page: number, searchText?: string}): Promise<PeopleResponse> => {
    const { searchText = "", page } = args;
    const url = searchText ? `people?search=${searchText.toLowerCase()}` : `people?page=${page || 1}`;
    const {data} = await axios.get(url);
    return data;
};

export const getPersonDetails = async (parent: any, args: {personId: number}): Promise<People> => {
    const {data} = await axios.get(`people/${args.personId}`);
    return data;
};