import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lottie from 'react-lottie';
import animationData from './lottieanime/starynight.json'; // Path to your Lottie file
import './App.css';
import pisces from './images/pisces.png';

function App() {
  const [inputs, setInputs] = useState({
    current_location: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: ''
  });

  const [showMessage, setShowMessage] = useState(false); // State to toggle form/message

  const images = [pisces];

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
    setShowMessage(true); // Show message when the form is submitted
  };

  const handleRegenerate = () => {
    setShowMessage(false); // Return to the form
  };

  return (
    <div className="App">
{/* 
<div className="carousel-container">
  <Slider {...settings}>
    {images.map((image, index) => (
      <div key={index}>
        <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
      </div>
    ))}
  </Slider>
</div>
*/}


      <div className="form-container">

        <div className="lottie-background">
          <Lottie options={{
            animationData: animationData,
            loop: true,
            autoplay: true, // Start the animation automatically
          }} />
        </div>

        <p>YOUR YEARLY PREDICTION</p>


        {showMessage ? (
          <div className="message-container">
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority 
              have suffered alteration in some form, by injected humour, or randomised words 
              which don't look even slightly believable. If you are going to use a passage of 
              Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the 
              middle of text. All the Lorem Ipsum generators on the Internet tend to repeat 
              predefined chunks as necessary, making this the first true generator on the 
              Internet. It uses a dictionary of over 200 Latin words, combined with a handful 
              of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
              The generated Lorem Ipsum is therefore always free from repetition, injected 
              humour, or non-characteristic words etc.
            </p>
            <button className="form-button" onClick={handleRegenerate}>Regenerate Prediction</button>
          </div>
        ) : (
          <>


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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
