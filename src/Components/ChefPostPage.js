import React, { useState, useEffect, useContext } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import axiosWithAuth from "../Utils/axiosWithAuth.js";
import axios from "axios";
import styled from "styled-components";
import ChefCardPost from "./ChefCardPost";
import ChefCardContext from "../context/ChefCardContext";

const PostPage = styled.div`
  background-color: #52ad9c;
  color: 347624f;
  width: 90%;
  margin: 0 auto;
  border: 4px solid #47624f;
  border-radius: 10px;
  height: 40vh;
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
  margin: 1% 0% 6% 0%;
  padding: 1%;
  width: 10%;
  font-weight: bold;
  background-color: #9ffcdf;
  color: #47624f;
  border: 2px solid #47624f;
  border-radius: 5%;
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
    background-color: #52ad9c;
    color: #edf9f3;
  }
`;
const Big = styled.big`
  color: #43db43;
  font-weight: bold;
`;

const ChefPosting = ({ values, touched, errors, status }) => {
  const [posts, setPosts] = useState([]);
  const ChefCard = useContext(ChefCardContext);
  useEffect(() => {
    status && setPosts(posts => [...posts, status]);
  }, [status]);
  // image

  return (
    <PostPage>
      <ChefCardPost />
      <CenterForm>Make New Post</CenterForm>
      <Form>
        <BoxField type="text" name="title" placeholder="title/name of dish" />
        {touched.title && errors.title && <p>{errors.title}</p>}
        <br />
        <BoxField component="select" name="mealType">
          <option>Please Choose an Option</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
          <option>Dessert</option>
        </BoxField>
        {touched.mealType && errors.mealType && <p>{errors.mealType}</p>}
        <br />
        <BoxField
          component="textarea"
          type="text"
          name="ingredients"
          placeholder="ingredients"
        />
        <br />
        <BoxField
          component="textarea"
          type="text"
          name="instructions"
          placeholder="instructions"
        />
        <br />
        <Button type="submit">Post</Button>
      </Form>
      <CardArea>
        {posts.map(post => (
          <PostCards key={post.id}>
            <p>
              <Big>Dish: </Big>
              {post.title}
            </p>
            <p>
              <Big>Meal Type: </Big>
              {post.mealType}
            </p>
            <p>
              <Big>Ingredients: </Big>
              {post.ingredients}
            </p>
            <p>
              <Big>Instructions: </Big>
              {post.instructions}
            </p>
          </PostCards>
        ))}
      </CardArea>
    </PostPage>
  );
};
const FormikChefPosting = withFormik({
  mapPropsToValues({ title, mealType }) {
    return {
      title: title || "",
      mealType: mealType || ""
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is a required field"),
    mealType: Yup.string()
      .oneOf(["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"])
      .required("Please select one")
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(ChefPosting);
export default FormikChefPosting;
