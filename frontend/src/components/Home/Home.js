import { useDispatch, useSelector } from "react-redux";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import SongsList from "../Songs/SongsList"
import "./Home.css"

const Home = () => {
    const currentUser = useSelector((state) => state.session.user);

    return currentUser ? (
        <div>
            <h2> Welcome!</h2>
            <h3>Check Out The Newest Songs</h3>
            <SongsList />
        </div>

    ) :
<div id='loginsignup'>
        <LoginFormPage />
      
        <SignupFormPage />
</div>

}

export default Home
