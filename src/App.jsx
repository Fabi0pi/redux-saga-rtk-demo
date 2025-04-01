import './App.css'
import { useCreatePostMutation, useGetPostsQuery, useLazyGetPostByIDQuery, useLazyGetPostsQuery, useUpdatePostMutation } from './store/slices/post'

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

function App() {
  const [getPosts] = useLazyGetPostsQuery()
  const [getSinglePost] = useLazyGetPostByIDQuery()
  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery()
  const [updatePost] = useUpdatePostMutation()
  const [createPost] = useCreatePostMutation()

  //useLazyGetPostsQuery
  const handleGetPosts = async () => {
    const { data } = await getPosts()
    console.log("🚀 ~ handleGetPosts ~ data:", data)
  }

  //useLazyGetPostByIDQuery
  const handleGetPostById = async () => {
    const id = getRandomId()
    const { data } = await getSinglePost(id)
    console.log(data)
  }

  //useCreatePostMutation
  const handleCreatePost = async () => {
    const post = {
      "userId": 11,
      "id": 101,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    }
    const newPost = await createPost(post)
    return newPost
  }

  //useUpdatePostMutation
  const handleUpdatePost = async () => {
    try {
      const post = {
        title: 'update post',
        body: 'update post'
      };

      // Esegui l'update
      const { data, error } = await updatePost({ id: 99, ...post });

      if (error) {
        console.error('Errore durante l\'aggiornamento:', error);
      } else {
        console.log('Post aggiornato con successo:', data);
        await refetch()
      }
    } catch (error) {
      console.error('Errore inatteso:', error);
    }
  };

  const LoadingData = () => {
    if (isError) return <div>Errore</div>
    return (
      <div>Caricamento....</div>
    )
  }



  return isLoading ? <LoadingData /> : (
    <div>
      <p>
        open redux dev tools to see it
      </p>
      <div className="card">
        <button onClick={handleGetPosts}>
          posts
        </button>
        <p>
          get posts
        </p>
      </div>
      <div className="card">
        <button onClick={handleGetPostById}>
          post
        </button>
        <p>
          get post by id
        </p>
      </div>
      <div className="card">
        <button onClick={handleCreatePost}>
          create
        </button>
        <p>
          create post
        </p>
      </div>
      <div className="card">
        <button onClick={handleUpdatePost}>
          update
        </button>
        <p>
          update post
        </p>
      </div>
    </div>
  )
}

export default App
