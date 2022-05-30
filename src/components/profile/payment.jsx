// Import material-ui component
import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import Typography from "@mui/material/Typography";

//icons
import { Error } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "./profile.css";

//api
import Plapi from "../../plapi";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  borderRadius: "30px",
  width: "94%",
}));

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ammount: 0,
      error: null,
      errorOpen: false,
    };
    this.submitRegistration = this.submitRegistration.bind(this);
  }
  errorClose(e) {
    this.setState({
      errorOpen: false,
    });
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  submitRegistration(e) {
    e.preventDefault();
    if (!this.state.ammount && !this.state.name) {
      this.setState({
        errorOpen: true,
        error: "Enter valid Credentials",
      });
    } else {
      this.showRazorpay();
    }
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: "65px",
          }}
        >
          <Box
            className="main-card"
            sx={{
              py: 1,
              display: "grid",
              borderRadius: "20px",
              textAlign: "center",
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>MAKE A PAYMENT</Typography>
            <Item key={16} elevation={16}>
              <Paper sx={{ padding: "15px", borderRadius: "20px" }}>
                <form onSubmit={() => this.submitRegistration}>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="Full-Name">Full-Name</InputLabel>
                    <Input
                      name="name"
                      type="name"
                      autoComplete="name"
                      onChange={this.handleChange("name")}
                    />
                    <FormHelperText>
                      Enter your full name as per your bank-account
                    </FormHelperText>
                  </FormControl>
                  <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="Ammount">Ammount</InputLabel>
                    <Input
                      name="Ammount"
                      type="Number"
                      onChange={this.handleChange("ammount")}
                    />
                    <FormHelperText>
                      Enter ammount to be added in your wallet
                    </FormHelperText>
                  </FormControl>

                  <Button
                    sx={{
                      backgroundColor: "rgb(4 4 4)!important",
                      borderRadius: "20px",
                    }}
                    disableRipple
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={this.submitRegistration}
                  >
                    PAY
                  </Button>
                </form>
                {this.state.error ? (
                  <Snackbar
                    variant="error"
                    key={this.state.error}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    open={this.state.errorOpen}
                    onClose={this.errorClose}
                    autoHideDuration={3000}
                  >
                    <SnackbarContent
                      message={
                        <div>
                          <span style={{ marginRight: "8px" }}>
                            <Error fontSize="large" color="error" />
                          </span>
                          <span> {this.state.error} </span>
                        </div>
                      }
                      action={[
                        <IconButton
                          key="close"
                          aria-label="close"
                          onClick={this.errorClose}
                        >
                          <CloseIcon color="error" />
                        </IconButton>,
                      ]}
                    />
                  </Snackbar>
                ) : null}
              </Paper>
            </Item>
          </Box>
        </Container>
      </Fragment>
    );
  }

  loadScript() {
    //  this will load the rajorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }

  async showRazorpay() {
    //  this will redirect to razorpay page
    const res = await this.loadScript();
    const obj = { ammount: this.state.ammount, user: this.state.name };
    // we will pass the amount and product name to the backend using form data

    const data = await Plapi.Wallet.makePayment(obj, res);

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY,
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        Plapi.Wallet.handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    //  after the successfull payment we need to redirect to the wallet page
  }
}
