import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import SongsList from "./components/Songs/SongsList";
import AddSongForm from "./components/Songs/AddSongForm";
import EditSongForm from "./components/Songs/EditSongForm";
import CreateSongForm from "./components/Songs/CreateSongForm";
import SongPage from "./components/Songs/SongPage";
import CommentList from "./components/Comments/CommentList";
import CreateCommentForm from "./components/Comments/CreateCommentForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
            <CommentList />
          </Route>
          <Route path={`/songs/:songId/comments`}>
            <CreateCommentForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
