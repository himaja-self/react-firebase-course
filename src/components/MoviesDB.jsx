import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
function MoviesDB() {
  const [movieList, setMovieList] = useState([]);

  const [movieTitle, setMovieTitle] = useState("")
  const [movieReleaseDate, setmovieReleaseDate] = useState(0)
  const [isRecievedOscar, setisRecievedOscar] = useState(false)
  const [updatedMovieTitle, setUpdateMovieTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies_firebase_demo");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const OnSubmitMovie = async (e) => {
    e.preventDefault();
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        release_date: movieReleaseDate,
        recievedOscar: isRecievedOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  const OnDeleteMovie = async (id) => {
    try {
      const movie = await doc(db, "movies_firebase_demo", id)
      await deleteDoc(movie)
      getMovieList()
    }
    catch (error) {
      console.error(error)
    }
  }

  const UpdateMovieTitle = async (id) => {
    try {
      const movie = await doc(db, "movies_firebase_demo", id)
      await updateDoc(movie, { title: updatedMovieTitle })
      getMovieList()
    }
    catch (err) {
      console.error(err)
    }
  }

  return <div>
    {/* basicall put operation for the movies using a form */}
    <form className="m-4">
      <div className="pb-2">
        <label htmlFor="movie_title" className="pr-2">Movie Title</label>
        <input
          className="border rounded"
          type="text"
          id="movie_title"
          name="movie_title"
          placeholder="Eg: Inseption"
          onChange={(e) => {
            setMovieTitle(e.target.value)
          }} />
      </div>
      <div className="pb-2">
        <label htmlFor="movie_date" className="pr-2">Movie Release date</label>
        <input
          className="border rounded"
          type="number"
          id="movie_date"
          name="movie_date"
          placeholder="Eg: 2011"
          onChange={(e) => { setmovieReleaseDate(Number(e.target.value)) }} />
      </div>
      <input
        type="checkbox"
        name="recievedOscor"
        id="recievedOscor"
        checked={isRecievedOscar}
        className="h-4.5 w-4.5"
        onChange={(e) => { setisRecievedOscar(e.target.checked) }} />
      <label htmlFor="recievedOscor">  Recieved Oscar</label>

      <button type="submit" onClick={OnSubmitMovie} className="block rounded p-1.5 bg-green-400 mt-2">Submit Movie</button>
    </form>
    {movieList.map((movie) => (
      <div key={movie.id} className="text-center p-3">
        <h1 className={`text-3xl font-bold ${movie.recievedOscar ? "text-green-500" : "text-red-500"} pb-2`}>
          {movie.title}{" "}
        </h1>
        <p>Date : {movie.release_date}</p>
        <div className="flex justify-center mt-1">
          <button className="block border rounded p-1 text-center" onClick={() => OnDeleteMovie(movie.id)}>Delete Movie</button>
        </div>
        <div className="flex flex-col items-center mt-2">
          <input type="text" placeholder="Update Movie Name" className="border rounded p-1 text-center m-1" onChange={(e) => { setUpdateMovieTitle(e.target.value) }} />
          <button className="text-center border rounded p-1" onClick={() => UpdateMovieTitle(movie.id)}>Update Movie Title</button>
        </div>
      </div>
    ))}
  </div>;
}

export default MoviesDB;
