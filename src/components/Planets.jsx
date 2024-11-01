import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Planet from "./Planet.jsx";

const fetchPlanet = async (page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);


    if (res.status === 404) {
        throw new Error('Page not found');
    }

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();

};

export default function Planets() {
    const [page, setPage] = useState(1);

    const { data, status, error, isFetching } = useQuery({
        queryKey: ['planets', page],
        queryFn: () => fetchPlanet(page),
        keepPreviousData: true,
        staleTime: 5000,
    });

     const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

      const handleNextPage = () => {
        if (data && data.next) setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h2>Planets</h2>
            <div className="pagination-container">
                <button onClick={handlePreviousPage} disabled={page === 1 || isFetching}>
                    Prev page
                </button>
                <div>{page}</div>
                <button onClick={handleNextPage} disabled={!data || !data.next || isFetching}>
                    Next page
                </button>
            </div>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && error.message === 'Page not found' ? (
                <div>Page not found. Please try a different page.</div>
            ) : status === 'error' ? (
                <div>Error loading data</div>
            ) : null}
            {status === 'success' && data && data.results ? (
                <div>
                    {data.results.map((planet) => (
                        <Planet key={planet.name} planet={planet} />
                    ))}
                </div>
            ) : null}
            {isFetching && <div>Updating data...</div>}
        </div>
    );
}
