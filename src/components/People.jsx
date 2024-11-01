import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Person from "./Person.jsx";


const fetchPeople = async (page) => {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);

    if (res.status === 404) {
        throw new Error('Page not found');
    }

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();
};

export default function People() {
    const [page, setPage] = useState(1);
    const { data, status, error,isFetching } = useQuery({
        queryKey: ['people', page],
        queryFn: () => fetchPeople(page),
        staleTime: 0
    });

    console.log(data);
     const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

     const handleNextPage = () => {
        if (data && data.next) setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h2>People</h2>
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
                    {data.results.map((person) => (
                        <Person key={person.name} person={person}/>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
