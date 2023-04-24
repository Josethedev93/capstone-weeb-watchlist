import { useEffect, useState } from 'react';
import './components/styles.css';
import AnimeList from './components/AnimeList';
import AnimeInfo from './components/AnimeInfo';
import AddToList from './components/AddToList';
import RemoveFromList from './components/RemoveFromList';
import Header from './components/Header';

function App() {

  const [search, setSearch] = useState('one piece');
  const [topAnimeData, setTopAnimeData] = useState();
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);

  const addToHandler = (anime) => {
    const index = myAnimeList.findIndex((myAnime) => {
      return myAnime._id === anime._id
    })
    if (index < 0) {
      const newArray = [...myAnimeList, anime]
      setMyAnimeList(newArray);
    }
  };

  const removeHandler = (anime) => {
    const newArray = myAnimeList.filter((myAnime) => {
      return myAnime._id !== anime._id
    })
    setMyAnimeList(newArray);
  };



  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
      'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
  };


  const getTopAnime = async () => {
    const temp = await fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc', options)
      .then(res => res.json())
    setTopAnimeData(temp.data)
  };

  const getAnime = async () => {
    const fullAnime = await fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${search}&sortBy=ranking&sortOrder=asc`, options)
      .then(res => res.json())
    setAnimeData(fullAnime.data)
  };

  useEffect(() => {
    getTopAnime();
    getAnime();
  }, [search]);


  return (
    <>
      <Header />
      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />};
        </div>
          <h2 className="text-heading">Top 10 Anime</h2>
        <div className="anime-row">
          <div className="row">
            <AnimeList
              animelist={topAnimeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addToHandler(anime)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-heading-anime">Anime</h2>
            </div>
        <div className='search-box'>
          <input type='search' placeholder='Search Anime :3'
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div className="anime-row">
          <div>
            <div className="row">
              <AnimeList
                animelist={animeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime) => addToHandler(anime)}
              />
            </div>
          </div>
        </div>
          <h2 className="text-heading">My List</h2>
        <div className="anime-row">
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
};

export default App;
