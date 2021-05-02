export interface People {
    name: string
    mass: string
    height: string
    gender: string
    homeworld: string
}

export interface PeopleResponse {
    count: number
    results: People[]
}