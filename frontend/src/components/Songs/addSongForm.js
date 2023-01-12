import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import { updateSong } from "../../store/songs";

//really just the song form for both creating and editing a song
//I am pushing in a song template from either EditSongForm or CreateSongForm, edit will already have the fields filled out
const AddSongForm = ({ song, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  // const [userId, setUserId] = useState(`${user.id}`)
  const [albumTitle, setAlbumTitle] = useState(song.albumTitle);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "New Song") {
      setErrors([]);
      const payload = {
        //does the order of items matter to match the backend?
        title,
        description,
        url,
        previewImage,
        albumTitle, //if I set this to = {album.id it will read the id from the back end if one exists}
      };

      const newSong = await dispatch(createSong(payload))
      .then((song) => history.push(`/songs/${song.id}`))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors, "DATAAA for ERRORSSS");
        if (data && data.errors) setErrors(data.errors);
      }); // sending it to the Thunk and action and reducer to update the state


// history.push("/songs");

      // ****** EDIT SONG FORM ******
    } else {
      const payload = {
        ...song,
        title,
        description,
        url,
        previewImage,
        albumTitle,
      };
      console.log(payload, " EDIT PAYLOAD");
      dispatch(updateSong(payload))
      .then((song) => history.push(`/songs/${song.id}`))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors, "DATAAA for ERRORSSS");
        if (data && data.errors) setErrors(data.errors);
      });
    }

// history.push("/songs");
  };

  //****** CANCEL BUTTON ******
  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("./");
  };

  return (
    <section>
      {errors.length > 0 &&
        errors.map((error, i) => <div key={i}> {error} </div>)}
      <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <label>Song Name</label>
        <input
          type="text"
          value={title}
          // update whatever was changed on this title target
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label>Album Name</label>
        <input
          type="text"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
        ></input>

        <label>Song Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label>Song Link</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>

        <label>Song Picture</label>
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        ></input>

        <button type="submit">Submit Song</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddSongForm;
