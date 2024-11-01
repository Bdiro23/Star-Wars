import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {
    const [page, setPage] = useState('planets');
    return (
        <>
            <div className="App">
                <h1>Star Wars info</h1>
                <Navbar setPage={setPage}/>
                <div className="contents">
                    {page === 'planets' ? <Planets/> : <People/>}
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </>

    );
}

export default App;
