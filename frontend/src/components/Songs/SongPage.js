import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SongPage = () => {
    const { songId } = useParams();
    console.log(songId, 'SONGID')
    const songs = useSelector((state) => state.songs);
    console.log(songs, 'SONGS')
  // const songArr = Object.values(songs)
  const song = songs[songId]
      console.log(song, 'SONG')


  return (
    <section>
      ID: {song.id}
      <br/>
      Title: {song.title}
      <br/>
      Description: {song.description}
      <br/>
      <a href='/songs'>
    <button>Back To Songs</button>
      </a>
      {/* <Link to="/songs">Back to Songs</Link> */}
    </section>
  );
}

export default SongPage;
