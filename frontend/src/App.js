import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import SongsList from "./components/Songs/SongsList";
import AddSongForm from "./components/Songs/addSongForm";
import EditSongForm from "./components/Songs/EditSongForm";
import CreateSongForm from "./components/Songs/CreateSongForm";
import SongPage from "./components/Songs/SongPage";
import CommentList from "./components/Comments/CommentList";
import CreateCommentForm from "./components/Comments/CreateCommentForm";
import UserSongs from "./components/Songs/UserSongs";
import Home from "./components/Home/Home";
import AllComments from "./components/Comments/AllComments";
import EditCommentForm from "./components/Comments/EditCommentForm";
import EditSignupForm from "./components/SignupFormPage/EditSignupForm";
import AlbumList from "./components/Albums/AlbumsList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div>

      <Navigation isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      </div>
      {isLoaded && (
        <Switch>
            <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs">
            <SongsList />
          </Route>
          <Route path="/songs/new">
            <CreateSongForm />
          </Route>
          <Route exact path={`/songs/:songId/edit`}>
            <EditSongForm />
          </Route>
          <Route exact path={`/songs/:songId`}>
            <SongPage />
          </Route>
          <Route exact path={`/comments`}>
            <AllComments/>
          </Route>
          <Route path={`/songs/:songId/comments`}>
            <CreateCommentForm />
          </Route>
          <Route path={`/comments/:commentId/edit`}>
            <EditCommentForm />
          </Route>
          <Route exact path={`/songs/users/:userId`}>
            <UserSongs />
          </Route>
          <Route exact path={`/users/:userId/edit`}>
            <EditSignupForm />
          </Route>
          <Route exact path={`/albums`}>
            <AlbumList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
