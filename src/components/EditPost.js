import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//remove async later
const EditPost = async (postId, updateFields) => {
  try {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFields),
      }
    );

    const editedPost = await response.json();
    return editedPost;
  } catch (error) {
    console.error(error);
  }
};

export default EditPost;
