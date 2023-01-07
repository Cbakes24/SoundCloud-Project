import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createSong } from '../../store/songs'


const AddSongForm = ({song, formType})  => {
const dispatch = useDispatch()
const history = useHistory()

const [title, setTitle] = useState(song.title)
const [description, setDescription] = useState(song.description)
const [url, setUrl] = useState(song.url)
// const [userId, setUserId] = useState(`${user.id}`)
const [albumTitle, setAlbumTitle] = useState(song.albumTitle)
const [previewImage, setPreviewImage] = useState(song.previewImage)

const handleSubmit = async (e) => {
    e.preventDefault()

    if(formType === 'New Song') {
        const payload = { //does the order of items matter
        title,
        description,
        url,
        previewImage,
        albumTitle //they wouldnt enter album id, if they enter album name does that work?
    }

    const newSong = await dispatch(createSong(payload))

history.push(`./`)
    } else {

        history.push(`./`)

    }

}

const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('./')
  };

return (
    <section>
         <form onSubmit={handleSubmit}>
        <h2>{formType}</h2>
        <label>Song Name</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}>
         </input>

         <label>Album Name</label>
        <input
        type="text"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}>
         </input>

         <label>Song Description</label>
        <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}>
         </input>

         <label>Song Link</label>
        <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}>
         </input>

         <label>Song Picture</label>
        <input
        type="text"
        value={previewImage}
        onChange={(e) => setPreviewImage(e.target.value)}>
         </input>

         <button type="submit">Submit Song</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>

    </section>

)

}

export default AddSongForm
