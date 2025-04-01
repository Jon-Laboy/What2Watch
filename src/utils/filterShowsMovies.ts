import { MovieData } from "../types/types"

export const onlyResultsWithPosters = (data: MovieData[]) => {
    return data?.filter(item => item.poster_path != null)
}