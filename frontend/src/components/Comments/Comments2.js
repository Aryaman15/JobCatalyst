import React, { useEffect, useState } from 'react'
import {getComments as getCommentsApi,createComment as createCommentApi, deleteComment as deleteCommentApi} from '../DemoApi/api.js'
import Comment from './Comment'
import CommentForm from './CommentsForm.js'

const Comments2 = ({currentUserId}) => {
    // states to track the comments made 
    const [backendComments,setBackendComments]=useState([])
    
    // writing a function to find the root comment 
    const rootComments=backendComments.filter(data=>data.parentId===null)
   
 
    // we have to sort the array according to (createdAt) time of their creation 
    const getReplies=(commendId)=>{
        //here the time will be in string so we have to convert the string to javascript Date to perform the sorting 
        //get time calculates the time in milliseconds
        return backendComments.filter(backendComment =>backendComment.parentId===commendId).sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())
    }

    const addComment=(text,parentId)=>{
        console.log("Added comment",text,parentId);
        //creating the comment and adding it to the array of objects
        createCommentApi(text,parentId)
        .then((comment)=>setBackendComments([comment,...backendComments]))
        .catch((e)=>{
            console.log("error on adding comments",e);
        })
    }

    const deleteComment=(commentId)=>{
        console.log(commentId);

        if(window.confirm("Are u sure that u want to delete the comment"))
        {
            //first step is to find the id to be deleted and then we can delete the user
            deleteCommentApi(commentId)  
            .then(()=>{
                const updatedBackendComments=backendComments.filter(backendComment=>backendComment.id!==commentId)
                setBackendComments(updatedBackendComments)
            })
            .catch()          
        }
    }
    
    const editComment=(commentId)=>{
         console.log("The id of the4 editted comment",commentId);
    }

    const replyComment=()=>{
    console.log(backendComments);
    }
    //we want to fetch data
    useEffect(()=>{
          getCommentsApi()
          .then((data)=>{
            setBackendComments(data)
          })
          .catch((e)=>{console.log("An error while loading the data from the backend",e);})
        },[]
    )

    console.log(rootComments.body);

  return (
    <div className='comments w-full'>

     <div className='comments-title'>
       <h4>Comments</h4>
     </div>
       {/* form for comments  */}
      <div className="comment-form-title">
            Write a comment
      </div>
        {/* Here comment form is to  be used in 
        1-> To make new Comments 
        2-> To make replies for those comments
        3-> To edit the comments / replies  */}

        <CommentForm
         key={rootComments.id}
         submitLabel="Write"
         handleSubmit={addComment}
        />
     <div className="comments-container gap-4">
        {
            //  nested comments are basically tree structure so mapping the root to access other commments which could be nested 
            rootComments.map(
                (rootComment)=>(
                    <Comment 
                    key={rootComment.id} 
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    currentUserId={currentUserId}
                    deleteComment={deleteComment}
                    />
                )
            )
        }
     </div>

    </div>
  )
}

export default Comments2