import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Modal from './Modal'; // Adjust the path as necessary
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/Carousel.css';

const MovieCarousel = ({ movies, setMovies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null); // Initialize selectedMovie state to in order to hide the modal by default

    const openModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className='ViewWishlist'>
            {selectedMovie && <Modal setMovies={setMovies} movies={movies} movie={selectedMovie} onClose={closeModal} isWishList={true}/>}
            <div className='carousel-container'>
                <Carousel showThumbs={false}>
                    {
                        movies && movies.length > 0
                            ?
                            movies.map((movie, index) => (
                                <div className='carousel-item' onClick={() => openModal(movie)} key={movie.movie_id}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                        <img src={movie.img_url} alt={movie.title} style={{ width: '50%', height: '900px', objectFit: 'cover', borderRadius: '10px 0 0 10px' }} />
                                        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h3 style={{ marginBottom: '10px' }}>{movie.title}</h3>
                                            <p style={{ marginBottom: '10px' }}>{movie.description}</p>
                                            <p style={{ marginBottom: '10px' }}><strong>Director:</strong> {movie.director}</p>
                                            <p style={{ marginBottom: '10px' }}><strong>Actors:</strong> {movie.actors}</p>
                                            <p style={{ marginBottom: '10px' }}><strong>Tag:</strong> {movie.tag}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <h2>{"No movies found 🥲"}</h2>
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default MovieCarousel;
