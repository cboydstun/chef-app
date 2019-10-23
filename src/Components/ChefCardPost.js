import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axiosWithAuth from "../Utils/axiosWithAuth.js";
import axios from "axios";
export function ChefCardPost() {
  const [deleteitem, setDeleteitem] = useState([]);
  const [post, setPost] = useState([]);

  axiosWithAuth()
    .post(
      `https://lambda-chef-portfolio.herokuapp.com/api/posts/create/posts/create`,
      { post }
    )
    .then(res => {
      console.log(res);
      localStorage.setPost("token", res.data.token);
    })
    .catch(err => {
      console.log(err);
    });

  axiosWithAuth()
    .put(`https://lambda-chef-portfolio.herokuapp.com/api/posts/update/id`, {
      post
    })
    .then(res => {
      console.log(res);
      localStorage.setPost("token", res.data.token);
    })
    .catch(err => {
      console.log(err);
    });

  axiosWithAuth()
    .delete(
      `https://lambda-chef-portfolio.herokuapp.com/api/posts/delete/:id`,
      {
        post
      }
    )
    .then(res => {
      console.log(res);
      localStorage.setPost("token", res.data.token);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <div>
      <h2>Chef Posting</h2>

      <span
        className="delete"
        onClick={props => deleteitem(this.props.deleteitem)}
      ></span>
    </div>
  );
}

export default ChefCardPost;
