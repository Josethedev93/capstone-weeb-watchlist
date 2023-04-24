import React from 'react'

const AnimeList = ({ animelist, setAnimeInfo, animeComponent, handleList }) => {

    const AddToList = animeComponent

    return (
        <>
            {
                animelist ? (
                    animelist.map((anime) => {
                        return (
                            <div className="card" key={anime._id} onClick={() => { setAnimeInfo(anime) }}>
                                <img src={anime.image} alt="animeImage" />
                                <div className="anime-info">
                                    <h4>{anime.title}</h4>
                                    <div className="overlay" onClick={()=>handleList(anime)}>
                                        <h4>{anime.title}</h4><br />
                                        <h3>SYNOPSIS</h3><br />
                                        <div className="synopsis">
                                            <p>{anime.synopsis}</p>
                                        </div>
                                        <AddToList/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : 'Finding Anime :)'
            }
        </>
    )
}

export default AnimeList;
