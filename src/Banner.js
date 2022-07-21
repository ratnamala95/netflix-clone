import React, {useState, useEffect} from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

    const [movie, setMovie] = useState([]);   // responsible for any random movie that gets selected for banner

    useEffect(()=>{

        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals); //got the complete array 
            // time to select a random index from the fetched array
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }   
        fetchData();
    }, []) ; //need to run just once therefore empty []

    console.log(movie);
// }
    function truncate(str, n) {
        return str?.length>n? str.substr(0, n-1) + "...": str;
    }
  return (
    <header className='banner'

        style={{
            backgroungSize: 'cover',
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
            backgroundPosition: 'center center'
        }}
    > {/*<<< Background image >>>*/}

        <div className='banner_contents'>
            
            {/* title */}
            <h1 className='banner_title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/* div with 2 buttons */}
            <div className='banner_buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>


            {/* desc */}
            <h1 className='banner_description'>
                {truncate(movie?.overview,150)}
            </h1>
        </div>
        <div className='banner--fadeBottom'></div> 
        {/* modifier */}
    </header>
  )
}

export default Banner