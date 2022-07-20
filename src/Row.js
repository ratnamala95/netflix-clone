import React, { useState, useEffect } from 'react';
import axios from './axios'; //creating an alias we can call it axios instead of instance coz it's a default export
import './Row.css';


// we need a snippet of code that runs based on a specific condition or variable


const baseURL = 'https://image.tmdb.org/t/p/original';


function Row({title, fetchURL}){

    const [ movies, setMovies ] = useState([]); // initialised empty array inside useState

    // if we leave the [] empty that means, run once and do not run again
    // if we give [movies] it means, run once and then run everytime movies changes

    useEffect(()=>{
        // we cannot directly run an async request inside useEffect

        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        
        fetchData();    
    },[fetchURL]);//if there is a variable that is being used inside useEffect
    // it is muct that it gets included inside [] otherwise it gives warning
    // since this hook depends on fetchURL it is now a dependency and all the dependencies 
    // need to be included coz the code needs rerendering when it changes
    
    // console.table(movies);
    return(
        <div className='row'>
            {/* title */}
            <h2>{title}</h2>

            <div className='row__posters'>
                {/* container -> posters */}
                {/* we want to map each item to an image tag */}

                {movies.map(movie => (
                    <img  
                        key={movie.id}
                        className='row_poster'
                        src={`${baseURL}${movie.poster_path}`} alt={movie.name} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Row;
