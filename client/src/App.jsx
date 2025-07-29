import React, { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Blog</h1>
      <PostForm onAddPost={handleAddPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;


