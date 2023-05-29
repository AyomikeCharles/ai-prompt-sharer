'use client'
import {useState} from 'react'
import Image from 'next/image'
import copyIcon from '@public/copy.png'
import copyIcon2 from '@public/copy2.png'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function PromptCard({post, handleTagClick, handleEdit, handleDelete}) {

  const [copy, setCopy] = useState('')
  const pathName = usePathname()
  const {data:session} = useSession()

  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>{setCopy('')}, 10000)
  }


  return (
    <div className='shadow rounded p-3 my-5 mx-auto md:w-1/2 bg-white'>
      <div className='flex justify-between items-start'>
        <Link href={session && session.user.email === post.creator?.email ?'/profile':`/profile/${post.creator._id}`} className='flex gap-3'>
          <div>
            <Image
              src={post.creator?.image}
              alt='creator picture'
              width={40}
              height={40}
              className='rounded-full'
            />
          </div>
          <div>
            <h3 className='font-bold'>{post.creator.username}</h3>
            <h3 className='text-sm text-gray-400'>{post.creator.email}</h3>
          </div>
        </Link>
        <button onClick={handleCopy}>
          {
            copy === ''?
            <Image
              src={copyIcon}
              width={25}
              height={25}
              alt='copy'
            />
            :
            <Image
              src={copyIcon2}
              width={25}
              height={25}
              alt='copy'
            />
          }
        </button>
      </div>
      
      <p className="mt-5 text-blue-900/70">{post.prompt}</p>
      <p className="text-blue-900/70 mt-3 cursor-pointer" onClick={()=> handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="justify-center gap-2 flex">
          <button onClick={handleEdit} className='text-blue-500'>Edit</button>
          <button onClick={handleDelete} className="text-red-600">Delete</button>
        </div>
      )}
    </div>
  )
}

export default PromptCard