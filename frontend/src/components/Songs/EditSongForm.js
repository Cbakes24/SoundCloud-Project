import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSongForm from "./addSongForm";

const EditSongForm = () => {
  const { songId } = useParams();
  console.log(songId, "SONGID");
  const songs = useSelector((state) => state.songs);
  console.log(songs, "SONGS");
  const song = songs[songId];
  console.log(song, "SONG   to   EDIT");

  return <AddSongForm song={song} formType="Edit Song" />;
};
export default EditSongForm;
