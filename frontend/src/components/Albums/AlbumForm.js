import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createUser, signup } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { createAlbum, updateAlbum } from "../../store/albums";

const CreateAlbum = ({ album }) => {
  const [title, setTitle] = useState(album?.title || "");
  const [description, setDescription] = useState(album?.description || "");
  const [image, setImage] = useState(album?.previewImage || null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  let albumId;
  if (album) {
    albumId = album.id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    let action;
    if (albumId) {
      action = updateAlbum;
    } else {
      action = createAlbum;
    }

    dispatch(action({ title, description, image, albumId }))
      .then(() => {
        setTitle("");
        setDescription("");
        setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
    history.push(`/albums/${albumId}`);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };

  return (
    <div>
      <h1>AWS S3 Express-React Demo</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          <input type="file" onChange={updateFile} />
        </label>
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit">Create Album</button>
      </form>
      {/* <div>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.image}
              alt="profile"
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default CreateAlbum;
