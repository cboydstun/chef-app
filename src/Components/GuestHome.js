import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import axiosWithAuth from "../Utils/axiosWithAuth";
import GuestHomeContext from "../context/GuestHomeContext.js"

const PostCard = styled.div`
  border: 2px solid black;
  background-color: #52ad9c;
  color: navy;
  width: 20%;
  padding: 2%;
  margin: 2%;
  text-align: left;
  border-radius: 5px;
  &:hover {
    background-color: #edf9f3;
    color: navy;
  }
`;
const CardArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Topic = styled.big`
  color: firebrick;
`;
const Form = styled.form`
  margin: 0 auto;
`;
const Input = styled.input`
  width: 20%;
  padding: 1%;
  border: 2px solid black;
`;

function GuestHome(handleSubmit) {
      const [cards, setCards] = useState([]);
      const [query, setQuery] = useState('');
      const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
      axios
        .get('https://lambda-chef-portfolio.herokuapp.com/api/posts')
        .then(response => {
          console.log(response.data);
          setCards(response.data);
          setFilteredCards(response.data);
        })
        .catch(error => {
          console.log('Data not found', error)
        });
    }, []);
    handleSubmit = () => {
    axios
      .get("https://lambda-chef-portfolio.herokuapp.com/api/users")
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err.response));
  };
  handleSubmit = () => {
    axios
      .get("https://lambda-chef-portfolio.herokuapp.com/api/posts/:username")
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err.response));
  };
  useEffect(() => {
    setFilteredCards(
      cards.filter(card =>
        card.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  if (!cards) {
    return <h1>Loading...</h1>;
  }
  if (cards) {
    return (
      <section>
        <Form>
          <Input
            type="text"
            onChange={handleInputChange}
            value={query}
            name="title"
            tabIndex="0"
            placeholder="search by title"
            autoComplete="off"
          />
        </Form>
        <CardArea>
          {filteredCards.map(data => (
            <PostCard key={data.id}>
              <p>
                <Topic>Dish: </Topic>
                {data.title}
              </p>
              <p>
                <Topic>Image: </Topic>
                {data.imageURL}
              </p>
              <p>
                <Topic>Category: </Topic>
                {data.category}
              </p>
              <p>
                <Topic>Chef: </Topic>
                {data.username}
              </p>
              <p>
                <Topic>Location: </Topic>
                {data.location}
              </p>
              <p>
                <Topic>Description: </Topic>
                {data.description}
              </p>
            </PostCard>
          ))}
        </CardArea>
      </section>
    );
  }
}
export default GuestHome;