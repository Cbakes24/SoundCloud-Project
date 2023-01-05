import { useDispatch } from 'react-redux'


const SingleSong = ({song}) => {
const dispatch = useDispatch()

 return (
    <div>
        <ul>
            <li>Song Name: {song.title}</li>
            <li>Description: {song.description}</li>
        </ul>
    </div>

 )

}


export default SingleSong
