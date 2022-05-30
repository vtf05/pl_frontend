import React, { Fragment, Component } from 'react';
import { Navigate } from "react-router-dom";


// Import material-ui components
import { Button , Box , Stack , Typography, IconButton, Avatar} from "@mui/material";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";


//icons
import SendIcon from "@mui/icons-material/Send";

// Import css
import "./loginView.css";
import Animation from "../animation/lottie";
import lottie from "../../assets/animation/login.json";

// // Import Google Login component
// import { GoogleLogin } from 'react-google-login';
// // https://github.com/anthonyjgrove/react-google-login

import Plapi from '../../plapi';


// Constants
// const { Control, Group, Text } = Form;
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      otp: 0,
      showOtp: "none",
      navigate :false ,
      alert : false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleOtpChange = this.handleOtpChange.bind(this);
    this.handleOtp = this.handleOtp.bind(this);
    this.handleAlert  = this.handleAlert.bind(this);
    
  }

  render() {
    const { showOtp, navigate ,alert} = this.state;
    return (
      <Box paddingTop={10}>
        <div>
          <Animation lottie={lottie} />
        </div>{" "}
        <Grid container justifyContent="center" rowSpacing={1}>
          <Grid item xs={12} lg={12} md={2}>
            <TextField
              label="Enter your Mobile No."
              id="outlined-size-small"
              size="small"
              onChange={this.handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ color: "#2fb6ad " }}
                    onClick={this.handleSend}
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12} md={2}>
            <TextField
              label="Enter the otp ."
              id="OTP-Field"
              size="small"
              sx={{ display: `${showOtp}` }}
              onChange={this.handleOtpChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ color: "#2fb6ad " }}
                    onClick={this.handleOtp}
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          {navigate ? <Navigate to="/home" replace={true} /> : null}
          {alert ? (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                   this.handleAlert();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              sending otp please wait !
            </Alert>
          ) : null}
        </Grid>
      </Box>
    );
  }
  
  handleAlert(){
      this.setState({alert:false})
  }

  handleChange(event) {
    this.setState({ number: event.target.value });
  }

  handleOtpChange(event) {
    this.setState({ otp: event.target.value });
  }

  async handleSend() {
    const number = this.state.number;
    this.setState({ alert: true });
    const res = await Plapi.User.getOtp(number);
    if (!res.error) {
      window.localStorage.setItem("number", number);
      this.setState({ showOtp: "true"  });
       this.setState({ alert: false });
    }
  }
 

  async handleOtp() {
    const otp = this.state.otp;
    const res = await Plapi.User.sendOtp(otp);
    if (!res.error) {
      const token = res.token;
      localStorage.setItem("access_token", token);
      const user = await Plapi.User.get(this.state.number);
      console.log("this is the user", user);
      window.localStorage.setItem("userId", user[0].id);
      this.setState({navigate:true});
    }

  }
}

export default LoginView;

