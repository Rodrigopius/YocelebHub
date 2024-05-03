import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//=== google firebase import start ===
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config';
import { useAuthState } from "react-firebase-hooks/auth"
// ===================================
import { toast } from 'react-toastify';

const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [user, setUser] = useAuthState(auth)//=======> firebase custom hooks state
  const navigate = useNavigate();// =====> navigate page

  const APIKEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    if (page < 1) {
      setPage(1)  // Increment page to 1 if it is less than 1.
    }
  }, [page]);


  const filteredGenre = async () => {
    const data = await fetch(
      ``
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results)); // Concat new movies with previous movies, on genre change movies are reset to [] so that only movies of new genre will appear, check out useEffect on top for more information.
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      ``
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results); 
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  const fetchGenre = async () => {
    const data = await fetch(
      ``
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  const fetchTrending = async () => {
    const data = await fetch(
      ``
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoader(false);
    setHeader("Trending");
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      ``
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoader(false);
    setHeader("Upcoming");
  }

  // creat local storage
  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorite");
  }


  //<========= firebase Google Authentication ========>
  const googleProvider = new GoogleAuthProvider();// =====> google auth provide

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/")
      toast.success("Login successfully");
    } catch (err) {
      console.log(err)
      navigate("/")
    }
  }
  // <==========================================================>

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        GetFavorite,
        totalPage,
        searchedMovies,
        GoogleLogin,
        user
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage
