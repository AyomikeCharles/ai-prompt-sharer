
import PromptCard from './PromptCard'
function Profile({name, desc, data, handleEdit, handleDelete}) {


  return (
    <section className="px-3 md:px-10">
        <h1 className="mt-10 font-bold text-blue-500 text-3xl">
            {name} profile
        </h1>
        <p className='text-blue-900/70 my-2'>
            {desc}
        </p>
        <div className='mt-10'>
            {data?.map((post)=>(
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={()=> handleEdit && handleEdit(post)}
                    handleDelete={()=> handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile