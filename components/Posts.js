import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase'
import { collection } from 'firebase/firestore'
import Post from './Post'

function Posts() {
    const [realtimePosts, loading, error] = useCollection(
        collection(db,'posts')
    )
    return (
       <div>
        {realtimePosts?( <div>{realtimePosts.docs.map((post,index)=>(
            <Post key={index} />
        ))}</div>):null}
       </div>
    )
}

export default Posts