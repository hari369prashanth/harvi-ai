import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import "./homepage.css";


const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      {/* Background Spline */}
      <div className="spline-bg">
        <Spline scene="https://prod.spline.design/K4K8eBZ7hfwiymxh/scene.splinecode"
        style={{ filter: "none" }} 
        pixelRatio={2}  />
      </div>

      {/* Overlay for better readability */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content">
        {/* Left Section */}
        <div className="left">
          <h1>HARVI AI</h1>
          <h4>by Harvitt</h4>
          <h2>Elevate Your Creativity with AI</h2>
          <p>Experience the next-generation AI companion that transforms your ideas into reality.</p>
          <Link to="/dashboard" className="cta-btn">Start Exploring</Link>
        </div>

        {/* Right Section - Chat Animation */}
        <div className="chat-container">
          <div className="chat1">
            <img 
              src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "bot.png"} 
              alt="Chat Avatar" 
            />
            <TypeAnimation
              sequence={[
                () => setTypingStatus("human1"),  // Start with human1 avatar
                "Human: What can you do?",
                1500,
            
                "", // This starts erasing the text
                500, // WAIT before switching avatar to bot
                () => setTypingStatus("bot"), 
                "Bot: I can generate content, assist with coding, and more!",
                2000,
            
                "", // Start erasing bot text
                300, // WAIT before switching avatar to human2
                () => setTypingStatus("human2"), 
                "Human2: Can you help me with my project?",
                1800,
            
                "", // Start erasing human2 text
                300, // WAIT before switching avatar to bot
                () => setTypingStatus("bot"), 
                "Bot: Absolutely! Tell me more about it.",
                2000,
            
                "", // Start erasing bot text before loop restarts
                300, // WAIT before switching avatar back to human1
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              className="typing-animation"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="terms">
        <img src="/logo.png" alt="Harvi AI Logo" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
