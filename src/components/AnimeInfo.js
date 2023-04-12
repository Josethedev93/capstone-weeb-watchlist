import React from 'react'

const AnimeInfo = (props) => {

    const {title, image, genres, ranking, status, episodes, alternativeTitles} = props.animeInfo



  return (
    <div className="anime-content">
        <h3>{title}</h3><br />
        <img src={image} alt="" /><br /><br />
        <div className="info">
            <h3>#Rank: {ranking}</h3><br />
            <h3>#Status: {status}</h3><br />
            <h3>#Episodes: {episodes}</h3><br />
            <h4>#Alternate Title(s): {alternativeTitles}</h4><br />
            <h4>#Genre: {genres}</h4><br />
            {/* <h4>#Duration: {duration}</h4> */}
        </div>
    </div>
  )
}

export default AnimeInfo;
