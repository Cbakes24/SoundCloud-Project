import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSongForm from "./AddSongForm";

// const CreateSongForm = () => {
//   const { songId } = useParams;
//   const song = {
//     title: '',
//     descritption: '',
//     url: '',
//     albumTitle: '',
//     previewImage: ''
//   };

const EditSongForm = () => {
  const { songId } = useParams();
  console.log(songId, 'SONGID')
  const songs = useSelector((state) => state.songs);
  console.log(songs, 'SONGS')
// const songArr = Object.values(songs)
const song = songs[songId]
    console.log(song, 'SONG   to   EDIT')


  return <AddSongForm song={song} formType="Edit Song" />;
};
export default EditSongForm;
