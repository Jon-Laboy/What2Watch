export const onlyResultsWithPosters = (data) => {
    return data?.filter(item => item.poster_path != null)
}