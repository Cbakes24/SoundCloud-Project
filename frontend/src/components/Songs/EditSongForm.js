import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSongForm from "./addSongForm";

const EditSongForm = () => {
  const { songId } = useParams();
  const songs = useSelector((state) => state.songs);
  const song = songs[songId];


  return <AddSongForm song={song} formType="Edit Song" />;
};
export default EditSongForm;
