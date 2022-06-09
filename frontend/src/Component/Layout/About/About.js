import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.facebook.com/farhansaeed.biplob";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/deep-developer/image/upload/v1654800535/avatars/275715449_2692568977554719_4547693875771527392_n_ycezzv.jpg"
              alt="Founder"
            />
            <Typography>Aesthetic watch illusion</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Profile
            </Button>
            <span>
              This is a sample wesbite made by @ParvesRiyan. Only with the
              purpose to make the store for page .
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/Awatchillusion"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.facebook.com/Awatchillusion" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;