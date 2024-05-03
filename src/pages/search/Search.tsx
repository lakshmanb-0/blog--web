import { PostCard } from "@/components";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { TypePost } from "@/types/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const Search = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') ?? ''
    const fetchPosts = useFetchPosts()
    const [searchResults, setSearchResults] = useState<TypePost[] | any>()

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchPosts(undefined, query)
            sessionStorage.setItem('searchResults', JSON.stringify({ query, results: JSON.stringify(data) }))
            setSearchResults(data)
        }

        let session = JSON.parse(sessionStorage.getItem('searchResults')!)
        if (session && query && query == session.query) {
            setSearchResults(JSON.parse(session.results));
        }
        else {
            query && fetchData()
        }
    }, [query])


    return (
        <div>
            <h1 className="text-3xl font-semibold py-5 text-center">Search results for: {query}</h1>
            {searchResults?.map((el: TypePost) => (
                <PostCard key={el.$id} data={el} />
            ))}
            {searchResults?.length === 0 && <p>No result found for </p>}
        </div>
    )
}

export default Search