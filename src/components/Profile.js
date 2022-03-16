import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { token } = useAuth();
  console.log(token);
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}'`,
            },
          }
        );
        const { success, data: profile, error } = await response.json();
        if (success) {
          setProfile(profile);
        } else {
          throw new Error("error fetching profile");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, [token]);

  console.log(profile);
  const { messages } = profile || {};
  const { posts } = profile || {};

  const activePosts = posts ? posts.filter((posts) => posts.active) : [];
  const inactivePosts = posts ? posts.filter((posts) => !posts.active) : [];

  //THIS IS SOFT DELETE.. DOESNT ACTUALLY DELETE INFO BUT JUST TURNS IT INACTIVE **IMPORTANT TO KNOW** - protect database integ, but not creating 'holes' that could lead to unknown errors btwn data points
  //drawbacks of this is storing tons of unused data & not GDPR compliant (GDPR is the ACTUAL deleting of user info)
  async function deletePost(postId) {
    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}'`,
          },
        }
      );
      const { success } = await response.json();
      if (success) {
        const filteredPosts = posts.map((post) => {
          if (post._id === postId) {
            post.active = false;
          }
          return post;
        });
        setProfile({ ...profile, posts: filteredPosts });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // return (
  //   <section>
  //     <div>{JSON.stringify(messages)}</div>
  //     <div>{JSON.stringify(posts)}</div>
  //   </section>
  // );

  return (
    <section>
      <div>
        <h1>My Messages</h1>
        {messages
          ? messages &&
            messages.map((msg) => (
              <article key={msg._id}>
                <h4>Post ID: {msg.post._id}</h4>
                <p>Post Title: {msg.post.title}</p>
              </article>
            ))
          : "no messages"}
      </div>
      <h1>My Posts</h1>
      <h3>Active Posts</h3>
      {activePosts.length
        ? activePosts &&
          activePosts.map((post) => (
            <article ket={post._id}>
              <h4>Title: {post.title}</h4>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </article>
          ))
        : "no active posts"}

      <h3>Inactive Posts</h3>
      {inactivePosts.length
        ? inactivePosts &&
          inactivePosts.map((post) => (
            <article ket={post._id}>
              <h4>Title: {post.title}</h4>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p>
            </article>
          ))
        : "no inactive posts"}
      {/* <EditPost setProfile={setProfile} /> */}
    </section>
  );
};

export default Profile;
