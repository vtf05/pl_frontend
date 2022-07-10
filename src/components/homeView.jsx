import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

// Import Material-UI components
import Grid from "@mui/material/Grid";
import { Avatar, Paper, Typography, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

// Import components

//import css
import "./homeView.css";
import image1 from "../image/login.png";
import Animation from "./animation/lottie";

// import custom components
import Drawer from "./item/drawer";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from "./slider/slider"


const slideImages = [
  {
    url: "src/assets/paella.jpg",
    caption: "Slide 1",
  },
 
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>  
            <div style={{ backgroundImage: `url(${slideImage.url})` }}>

            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: [
        {
          value: "user",
        },
        {
          value: "items",
          label: "$",
        },
      
      ],
      selectedItem1: "user",
      selectedItem2: "user",
      open: false,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  render() {
    const { selectedItem1, selectedItem2, open, disabled } = this.state;
    return (
      <Grid container spacing={2} paddingTop={5.5}>
        <Grid item lg={6} md={6} sm={12} xs={12} className="center-grid">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Slider />
            </Grid>
            <Grid item xs={12}>
              <Typography  className="mid-section" sx={{fontSize:"15px"}}>
                {" "}
                lets get started{" "}
              </Typography>
              <Typography variant="h6" className="mid-section" sx={{fontWeight:550}}>
                {" "}
                Choose an option from below{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                value={selectedItem1}
                onChange={this.handleChange}
                variant="filled"
                size="small"
                fullWidth
                className="option-button"
                sx={{ borderRadius: "17px" }}
              >
                {this.state.searchItem.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ borderRadius: "17px" }}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Drawer disabled={disabled} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  handleChange(event) {
    this.setState({ selectedItem1: event.target.value, disabled: false });
  }
  toggleDrawer(event, newopen) {
    console.log(newopen);
    this.setState({ open: newopen });
  }
}
