'use client'
import {useState, useEffect} from 'react'
import Profile from '@components/Profile'

function MyProfile({params}) {

    const [posts, setPost] = useState([])

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch(`../api/users/${params.slug}/posts`)
            const data = await response.json()
            setPost(data)
        }

            fetchPosts()
        
    }, [])


  return (
    <Profile
        name={posts[0]?.creator?.username}
        desc='welcome to your profile page'
        data={posts}
        handleEdit={false}
        handleDelete={false}
    />
  )
}

export default MyProfile