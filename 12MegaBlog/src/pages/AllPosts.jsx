import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {}, []) // we could pass Query in empty array given in getPosts.

    appwriteService.getPosts([]).then((posts) => {
        if(posts) {
            setPosts(posts.documents)
        }
    })
    

    
  return (
    <div className='w-full py-8'>
        <Container>
            <div>
                {posts.map((post) => (
                    <div key={post.$id}
                    className='w-1/4 p-2'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts