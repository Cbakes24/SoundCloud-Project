import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SongPage = () => {
  const { songId } = useParams();
  const report = useSelector( state => state.songs[songId])


    console.log(song.id, 'REEEEEEPPPP')


  return (
    <section>
      ID: {song.id}
      <br/>
      Title: {song.title}
      <br/>
      Description: {song.description}
      <br/>
      <Link to="/">Back to Songs</Link>
    </section>
  );
}

export default SongPage;
