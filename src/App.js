import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lottie from 'react-lottie';
import animationData from './lottieanime/starynight.json'; // Path to your Lottie file
import './App.css';
import pisces from './images/pisces.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function App() {
  const [inputs, setInputs] = useState({
    current_location: '',
    date_of_birth: '',
    time_of_birth: '',
    place_of_birth: ''
  });

  const [showMessage, setShowMessage] = useState(false); // State to toggle form/message
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://emogpt-de4d.onrender.com/api/sendAstroMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeOfBirth: inputs.place_of_birth,
          dateOfBirth: inputs.date_of_birth,
          timeOfBirth: inputs.time_of_birth,
          currentLocation: inputs.current_location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setResponseMessage(data.message || 'Prediction fetched successfully!');
      setShowMessage(true); // Show message when the form is submitted
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again later.');
      setShowMessage(true);
    } finally {
      setLoading(false); // Reset loading state after response
    }
  };

  const handleRegenerate = () => {
    setShowMessage(false); // Return to the form
    setResponseMessage('');
  };

  return (
    <div className="App">
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
    <p>YOUR YEARLY PREDICTION</p>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {responseMessage}
    </ReactMarkdown>
    <button className="form-button" onClick={handleRegenerate}>
      Regenerate Prediction
    </button>
  </div>
) : (
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
    <button type="submit" className="form-button">
      Submit
    </button>
  </form>
)}

        )}
      </div>
    </div>
  );
}

export default App;
