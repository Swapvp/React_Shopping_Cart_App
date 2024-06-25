//App.js

import React, { useState } from "react";
import "./App.css";
import SearchComponent from "./Components/SearchComponent";
import ShowCourseComponent from "./Components/ShowCourseComponent";
import UserCartComponent from "./Components/UserCartComponent";

function App() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "T-shirt",
      price: 499,
      image:
        "https://i.etsystatic.com/20863131/r/il/917fad/2075104115/il_570xN.2075104115_r9c2.jpg",
    },
    {
      id: 2,
      name: "Bag",
      price: 699,
      image: "https://m.media-amazon.com/images/I/513cxd91MuL._SR290,290_.jpg",
    },
    {
      id: 3,
      name: "Hoodie",
      price: 799,
      image:
        "https://images-cdn.ubuy.co.in/65932f18b55c7b5d256d288c-programming-if-coding-headphones-hoodie.jpg",
    },
  ]);

  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");

  const addCourseToCartFunction = (GFGcourse) => {
    const alreadyCourses = cartCourses.find(
      (item) => item.product.id === GFGcourse.id
    );
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map((item) =>
        item.product.id === GFGcourse.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, { product: GFGcourse, quantity: 1 }]);
    }
  };

  const deleteCourseFromCartFunction = (GFGCourse) => {
    const updatedCart = cartCourses.filter(
      (item) => item.product.id !== GFGCourse.id
    );
    setCartCourses(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="App">
      <SearchComponent
        searchCourse={searchCourse}
        courseSearchUserFunction={courseSearchUserFunction}
      />
      <main className="App-main">
        <ShowCourseComponent
          courses={courses}
          filterCourseFunction={filterCourseFunction}
          addCourseToCartFunction={addCourseToCartFunction}
        />

        <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
        />
      </main>
    </div>
  );
}

export default App;
