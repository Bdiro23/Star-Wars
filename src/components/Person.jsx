import React from 'react';

export default function Person({ person }) {
    return (
        <div className="card">
            <h3>{person.name}</h3>
            <p>Gender - {person.gender}</p>
            <p>Birth_year - {person.birth_year}</p>
        </div>
    );
}