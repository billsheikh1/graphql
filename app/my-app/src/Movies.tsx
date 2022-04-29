import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
    {
        movies {
            id
            name
        }
    }
`;

export default function Movies() {
    const { data, loading, error } = useQuery(QUERY);
    if (loading) return <pre>Loading...</pre>;
    if (error) return <pre>{error.message}</pre>

    console.log('data', data);
    return (
        <div>
            <ul>
                {data.movies.map((movie: any) => (
                    <li key={movie.id}>{movie.name} {movie.genre}</li>
                ))}
            </ul>
        </div>
    )
}