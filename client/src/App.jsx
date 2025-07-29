import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    setTitle('');
    const res = await fetch('/api/posts');
    setPosts(await res.json());
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Post App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
