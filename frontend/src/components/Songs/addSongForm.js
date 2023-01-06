import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createSong } from '../../store/songs'


const AddSongForm = ()  => {
const dispatch = useDispatch()
const history = useHistory()

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [url, setUrl] = useState('')
// const [userId, setUserId] = useState(`${user.id}`)
const [albumTitle, setAlbumTitle] = useState('')
const [image, setImage] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = { //does the order of items matter
        title,
        description,
        url,
        image,
        albumTitle //they wouldnt enter album id, if they enter album name does that work?
    }

    const newSong = await dispatch(createSong(payload))

history.push(`./`)
}

const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('./')
  };

return (
    <section>
         <form onSubmit={handleSubmit}>
        <h2>Add a Song Form</h2>
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
        value={image}
        onChange={(e) => setImage(e.target.value)}>
         </input>
         <button type="submit">Create new Song</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>

    </section>

)

}

export default AddSongForm
