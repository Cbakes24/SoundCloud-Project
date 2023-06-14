import { useState } from "react";
import { createUser, signup } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from "../../store/songs";



const AddSongForm = () => {
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState(null);
  const [audioFile, setAudioFile] = useState(null)




  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
    const userId = user.id
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    dispatch(createSong({ title, description, album, audioFile}))
      .then(() => {
        setTitle("");
        setDescription("");
        setAlbum(null);
        setAudioFile(null)
       
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
  console.log(audioFile, "*** MP3 IN THE COMP ****")
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
        <input
          type="select"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        ></input>

        <label>Song Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label>Song File</label>
        <input type="file" onChange={updateFile} />
     

        <button type="submit">Submit Song</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default AddSongForm;
