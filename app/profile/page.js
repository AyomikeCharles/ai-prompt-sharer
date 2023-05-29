'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

function MyProfile() {

    const {data:session} = useSession()
    const [posts, setPost] = useState([])
    const router = useRouter()

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch(`api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPost(data)

        }

        if(session?.user.id){
            fetchPosts()
        }
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {

        const confirmed = confirm('click ok to delete prompt')

        if(confirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })

                const newPosts = posts.filter((newPost)=>(
                    newPost._id !== post._id
                ))

                setPost(newPosts)
            }catch(err){
                console.log(err)
            }
        }

    }


  return (
    <Profile
        name="My"
        desc='welcome to your profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile