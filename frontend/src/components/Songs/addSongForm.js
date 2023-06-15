import { useState, useEffect } from "react";
import { createUser, signup } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from "../../store/songs";
import { getAlbums } from "../../store/albums";
const AddSongForm = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  console.log("🚀 ~ file: addSongForm.js:26 ~ AddSongForm ~ albums:", albums);

  const userId = user.id;

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];

    console.log(
      "🚀 ~ file: addSongForm.js:37 ~ handleSubmit ~ **** NEW SONG INF **** :",
      title,
      description,
      albumId,
      audioFile
    );
    dispatch(createSong({ title, description, albumId, audioFile }))
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
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(file);
  };
  // console.log(audioFile, "*** MP3 IN THE COMP ****");
  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };
  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("./");
  };

  return (
    <section>
      {errors.length > 0 &&
        errors.map((error, i) => <div key={i}> {error} </div>)}

      <form onSubmit={handleSubmit}>
        <h2>Song Form</h2>
        <label>Song Name</label>
        <input
          type="text"
          value={title}
          // update whatever was changed on this title target
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label>Album Name</label>
        <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
          <option value="">Select an album</option>
          {Object.values(albums).map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>

        <label>Song Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label className="audio-file">Song File</label>
        <input type="file" accept="audio/*" onChange={updateFile} required />

        <button type="submit">Submit Song</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddSongForm;
