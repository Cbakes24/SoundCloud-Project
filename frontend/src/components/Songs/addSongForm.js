import { useState, useEffect } from "react";
import { createUser, signup } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSong, updateSong } from "../../store/songs";
import { getAlbums } from "../../store/albums";



const AddSongForm = ({song, formType}) => {
  const history = useHistory();
  const [title, setTitle] = useState( song.title || "");
  const [description, setDescription] = useState(song.description || "");
  const [albumId, setAlbumId] = useState( song.albumId || "");
  const [audioFile, setAudioFile] = useState( song.url || null);

  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const songId = song.id
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
 

  const userId = user.id;

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];
    let action;
    if(songId) {
      action = updateSong
    } else {
      action = createSong
    }

      const data = await dispatch(action({ title, description, albumId, audioFile, songId }))
        .then(() => {
          setTitle("");
          setDescription("");
          setAlbumId("");
          setAudioFile(null);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
        history.push(`/songs/${song.id}`)
    };
    

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
  };

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };
  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("./");
  };

  return ( user ? (


    <section>
      {errors.length > 0 &&
        errors.map((error, i) => <div key={i}> {error} </div>)}

      <form onSubmit={handleSubmit}>
        <h2>Song Form</h2>
        <label>
        <input
        placeholder="Song Name"
          type="text"
          value={title}
          // update whatever was changed on this title target
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        </label>

        <label>
            <select 
            placeholder="Album Name"
            value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
          <option value="">Select an album</option>
          {Object.values(albums).map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
        </label>
    

        <label>
        
        </label>
        <input
        placeholder="Song Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label className="audio-file">Song File
        
        </label>
        <input type="file" accept="audio/*" onChange={updateFile} required />

        <button type="submit">Submit Song</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  ) : history.push(`/`) 
)};

export default AddSongForm;
