import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateAlbum from "./AlbumForm";

const EditAlbumForm = () => {
  const { albumId } = useParams();
  const albums = useSelector((state) => state.albums);
  const album = albums[albumId];


  return <CreateAlbum album={album} formType="Edit Album" />;
};
export default EditAlbumForm;
