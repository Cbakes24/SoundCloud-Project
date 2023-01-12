import CommentForm from "./CommentForm";
import { useSelector} from 'react-redux'
const CreateCommentForm = () => {

    const currentUser = useSelector((state) => state.session.user)

  const comment = {
   body: '',
   username: currentUser.username
  };

  return (
    <CommentForm comment={comment} formType="New Comment" />
  );
}

export default CreateCommentForm;
