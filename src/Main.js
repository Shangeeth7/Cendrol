import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";

function Main() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentJoke, setCurrentJoke] = useState("");

  useEffect(() => {
    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const closeModal = () => {
    setSelectedCategory(null);
    setActiveButton(null);
  };

  const handleButtonClick = (category, index) => {
    setSelectedCategory(category);
    setActiveButton(index);
    fetchNextJoke(category);
  };

  const fetchNextJoke = (category) => {
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        setCurrentJoke(response.data.value);
      })
      .catch((error) => {
        console.error("Error fetching joke: ", error);
      });
  };

  return (
    <div className="overAll">
      <div className="bouncing">Chuck Norris</div>
      <div className="buttonsss">
        {categories.map((category, index) => (
          <button
            key={index}
            style={{ margin: "10px" }}
            onClick={() => handleButtonClick(category, index)}
            className={`one-btns ${index === activeButton ? "active" : ""}`}
          >
            <p
              className="category-title"
              style={{
                color: "#1f3a8a",
                // marginTop: "-20px",
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>

            <h4
              className="joke-caption"
              style={{ marginTop: "-15px", color: "#7e3cb4" }}
            >
              Unlimited Jokes On{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div
          style={{
            color: "white",
          }}
          className="modal"
        >
          <p
            className="below-cat"
            style={{ textAlign: "center", marginTop: "0" }}
          >
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </p>
          <div className="content-box">
            <p className="currentJoke">"{currentJoke}"</p>
            <button
              className="next-joke-button"
              onClick={() => fetchNextJoke(selectedCategory)}
            >
              Next Joke
            </button>
          </div>
          <button onClick={closeModal} className="close-button">
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
