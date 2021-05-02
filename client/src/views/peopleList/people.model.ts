export interface People {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
}

export interface PeopleResponse {
    people?: {
        count: number
        results: People[]
    }
}