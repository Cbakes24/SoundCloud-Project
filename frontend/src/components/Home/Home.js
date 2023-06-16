import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import SongsList from "../Songs/SongsList"
import AllComments from "../Comments/AllComments";
import "./Home.css"

const Home = () => {
    const currentUser = useSelector((state) => state.session.user);

    return currentUser ? (
        
        <div className="homepage">
            <h2> Welcome!</h2>
            <h3>Check Out The Newest Songs</h3>
            <span className="songfeed">

            <div>
            <SongsList  className='song-list-home'/>
            </div>
            <div>
            <AllComments  />
            </div>
        <div className='songfeed-bottom'></div>
            </span>

        </div>

    ) :
<div id='loginsignup'>
        <LoginFormPage />
      
        <SignupFormPage />
</div>

}

export default Home
