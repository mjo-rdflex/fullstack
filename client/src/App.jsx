import React, { useEffect, useState } from 'react';

const API_URL = 'https://fullstack-nspz.onrender.com/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching posts.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const newPost = await res.json();
      setPosts([newPost, ...posts]); // Add new post at top
      setTitle('');
    } catch (err) {
      setError('Error creating post.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>📝 Post Manager</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          placeholder="Enter post title"
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Post</button>
      </form>

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul style={styles.list}>
          {posts.map((post) => (
            <li key={post.id} style={styles.listItem}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  form: {
    marginBottom: '30px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '70%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'left',
  },
  listItem: {
    padding: '10px',
    background: '#f4f4f4',
    marginBottom: '10px',
    borderRadius: '4px',
  },
};

export default App;

