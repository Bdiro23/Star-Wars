import React from 'react'

export default function Navbar(props){
    return (
    <nav>
        <button onClick={()=>props.setPage('planets')}>Planets</button>
        <button onClick={()=>props.setPage('people')}>People</button>
    </nav>
    );
}