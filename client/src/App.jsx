import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const API = import.meta.env.VITE_API_URL;

  const fetchPosts = async () => {
    const res = await fetch(`${API}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Post Creator</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write something..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <hr />
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
