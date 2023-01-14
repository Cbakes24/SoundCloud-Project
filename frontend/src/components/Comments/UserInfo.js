


const UserInfo = ({comment}) => {

    const username = comment.User.username

    return (
        <li>{username}</li>
    )
}


// import { useDispatch, useSelector } from "react-redux";

// import { useEffect } from 'react'
// import { getUserInfo } from "../../store/session";

// const UserInfo = ({comment}) => {

//     console.log(comment.userId, "THIS IS A COMMENT")
//     const dispatch = useDispatch()
// let userObj = useSelector(state => state.session.commentUser)
// console.log(userObj, 'USER OBJECTTT')


// useEffect(() => {
//     dispatch(getCommentInfo(comment.userId))
// }, [dispatch])



// // console.log(username, 'THE ULTIMATE OF THE COMMENT')

//     return (

//         <li>{userObj}</li>

//     )
// }

export default UserInfo
