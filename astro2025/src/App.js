import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lottie from 'react-lottie';
import animationData from './lottieanime/starynight.json'; // Path to your Lottie file
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    current_location: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: ''
  });

  const images = [/* your images array */];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Concatenated output: ${Object.values(inputs).join(' ')}`);
  };

  return (
    <div className="App">
      <div className="lottie-background">
        <Lottie options={{
          animationData: animationData,
          loop: true,
          autoplay: true, // Start the animation automatically
        }} />
      </div>

      <div className="form-container">
        <h1>YEARLY PREDICTIONS</h1>

        <div className="carousel-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
              </div>
            ))}
          </Slider>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.keys(inputs).map((key, index) => (
            <input
              key={index}
              type="text"
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="form-input"
            />
          ))}
          <button type="submit" className="form-button">Go</button>
        </form>
      </div>
    </div>
  );
}

export default App;
