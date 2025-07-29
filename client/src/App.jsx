// App.jsx
import React, { useState, useEffect } from 'react';

const API_URL = 'https://fullstack-nspz.onrender.com/api/posts';

const App = () => {
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error('Failed to create post');
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setTitle('');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Post Creator</h1>

        <form onSubmit={handleSubmit} className="flex items-center space-x-3 mb-8">
          <input
            type="text"
            placeholder="Write a new post..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">📚 Latest Posts</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found.</div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;



