import { useEffect, useState } from 'react';
import './components/style.css'
import AnimeList from './components/AnimeList';
import AnimeInfo from './components/AnimeInfo';
import AddToList from './components/AddToList';
import RemoveFromList from './components/RemoveFromList';

function App() {

  // const [search, setSearch] = useState('');
  const [topAnimeData, setTopAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([])

  const addToHandler = (anime) => {
    const index = myAnimeList.findIndex((myAnime) => {
      return myAnime._id === anime._id
    })
    if (index < 0) {
      const newArray = [...myAnimeList, anime]
      setMyAnimeList(newArray);
    }
  }

  const removeHandler = (anime) => {
    const newArray = myAnimeList.filter((myAnime) => {
      return myAnime._id !== anime._id
    })
    setMyAnimeList(newArray);
  }

  // const handleSearch = e => {
  //   e.preventDefault();

  //   searchAnime(search)
  // }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0c56ecb7a2msh8c3ec22ad8ab884p1dca18jsna2adecf52bfd',
      'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
  };
  // const searchAnime = async (query) => {
  //   const search = fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=8&${query}&sortBy=ranking&sortOrder=asc`, options)
  //     .then(response => response.json())
  //     setSearch(search.data)
  //     console.log(search.data)
  // }
  

  const getTopAnime = async () => {
    const temp = await fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=5&sortBy=ranking&sortOrder=asc', options)
      .then(res => res.json())
    setTopAnimeData(temp.data)
  }

  useEffect(() => {
    getTopAnime();
  }, []);


  return (
    <>
      <div className='header'>
        <h1>Weeb Watchlist</h1>
        <div className='search-box'>
          <input type='search' placeholder='Search Anime' 
          // onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>
      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Top 5 Anime</h2>
          <div className="row">
            <AnimeList
              animelist={topAnimeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addToHandler(anime)}
            />
          </div>
          <div>
            <h2 className="text-heading">Anime</h2>
            <div className="row">
              <AnimeList
                animelist={topAnimeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime) => addToHandler(anime)}
              />
            </div>
          </div>
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeHandler(anime)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
