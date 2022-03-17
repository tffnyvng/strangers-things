import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
import styled from "styled-components";

const ProfileStyle = styled.section`
  & {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: auto;
    padding: 0.5rem;
  }
`;

const Headers = styled.h1`
  text-decoration: underline;
  padding: 0;
  font-size: 25px;
  text-weight: bold;
  margin: 10px;
`;

const SubHeaders = styled.h3`
  text-decoration: underline;
  padding: 0.2rem;
  margin: 10px;
`;

const ProfileContainers = styled.section`
  & {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: auto;
    padding: 0.5rem;
  }
`;

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
    <ProfileStyle>
      <ProfileContainers>
        <Headers>My Messages</Headers>
        {messages ? (
          messages &&
          messages.map((msg) => (
            <article key={msg._id}>
              <h4>Post ID: {msg.post._id}</h4>
              <p>Post Title: {msg.post.title}</p>
            </article>
          ))
        ) : (
          <div> no messages </div>
        )}
      </ProfileContainers>
      <ProfileContainers>
        <Headers>My Posts</Headers>
        <SubHeaders>Active Posts</SubHeaders>
        {activePosts.length ? (
          activePosts &&
          activePosts.map((post) => (
            <article key={post._id}>
              <h4>Title: {post.title}</h4>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </article>
          ))
        ) : (
          <div>no active posts</div>
        )}

        <SubHeaders>Inactive Posts</SubHeaders>
        {inactivePosts.length ? (
          inactivePosts &&
          inactivePosts.map((post) => (
            <article ket={post._id}>
              <h4>Title: {post.title}</h4>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p>
            </article>
          ))
        ) : (
          <div>no inactive posts</div>
        )}
        {/* <EditPost setProfile={setProfile} /> */}
      </ProfileContainers>
    </ProfileStyle>
  );
};

export default Profile;
