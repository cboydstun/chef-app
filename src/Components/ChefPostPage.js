import React, { useState, useEffect, useContext } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import styled from "styled-components";
import axiosWithAuth from "../Utils/axiosWithAuth.js";
//import ChefCardPost from "./ChefCardPost.js";

//import ImageUpload from "./ImageUpload";
//import ImageDownload from "./ImageDownload";

const PostPage = styled.div`
  background-color: #52ad9c;
  color: 347624f;
  width: 90%;
  margin: 0 auto;
  border: 4px solid #47624f;
  border-radius: 10px;
  height: 100%;
`;
const BoxField = styled(Field)`
  padding: 1%;
  margin: 1%;
  border: 2px solid black;
  width: 20%;
`;
const CenterForm = styled.h1`
  margin-top: 5%;
`;
const Button = styled.button`
  margin: 1% 0% 2% 0%;
  padding: 1%;
  width: 10%;
  font-weight: bold;
  background-color: #9ffcdf;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  &:hover {
    background-color: white;
  }
`;
const CardArea = styled.div`
  margin-left: 12%;
  display: flex;
  flex-wrap: wrap;
`;
const PostCards = styled.div`
  background-color: #edf9f3;
  color: #47624f;
  border: 2px solid #47624f;
  border-radius: 5%;
  width: 20%;
  margin: 2%;
  padding: 2%;
  text-align: left;
  &:hover {
    background-color: #9ffcdf;
    color: black;
  }
`;
const Big = styled.big`
  color: firebrick;
  font-weight: bold;
`;

const ChefPosting = status => {
  // const [posts, setPosts] = useState([{title:' ', category:' ', description:' ', imgURL:' ', username:' ', location:' '}]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    status && setPosts(posts => [...posts, status]);
  }, [status]);

  return (
    <PostPage>
      <CenterForm>Make New Post</CenterForm>
      <Form>
        <BoxField type="text" name="title" placeholder="title/name of dish" />
        <br />
        <BoxField component="select" name="category">
          <option>Please Choose an Option</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
          <option>Dessert</option>
        </BoxField>
        <br />
        <BoxField
          component="textarea"
          type="text"
          name="description"
          placeholder="description"
        /><br />
        <BoxField
          type="text"
          name="username"
          placeholder="username"
        /><br />
        <BoxField
          type="text"
          name="imgURL"
          placeholder="post an image"
        /><br />
        <BoxField
          type="text"
          name="locations"
          placeholder="city/state"
        /><br />
        <Button type="submit">Post</Button>
      </Form>
      <CardArea>
        {posts.map(data => (
          <PostCards key={data.id}>
            <p>
              <Big>Dish: </Big>
              {data.title}
            </p>
            <p>
              <Big>Meal Type: </Big>
              {data.category}
            </p>
            <p>
              <Big>Description: </Big>
              {data.description}
            </p>
            <p>
              <Big>Chef: </Big>
              {data.username}
            </p>
            <p>
              <Big>Image: </Big>
              {data.imgURL}
            </p>
            <p>
              <Big>Location: </Big>
              {data.location}
              {console.log(data.location)};
            </p>
          </PostCards>
        ))}
      </CardArea>
    </PostPage>
  );
};
const FormikChefPosting = withFormik({
  mapPropsToValues({ title, category, description, username, imgURL, locations }) {
    return {
      title: title || "",
      category: category || "",
      description: description || "",
      username: username || "",
      imgURL: imgURL || "",
      locations: locations || ""
    };
  },
  handleSubmit(values, { setStatus }) {
    axiosWithAuth()
      .post(
        "https://lambda-chef-portfolio.herokuapp.com/api/posts/create",
        values
      )
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(ChefPosting);
export default FormikChefPosting;