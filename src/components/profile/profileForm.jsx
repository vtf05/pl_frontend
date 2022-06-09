// component
import { Component } from "react";
import "./profile.css";
import { Navigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

//import custom
import Table from "./transaction";

// icon
import ProfilePic from "../../assets/profile2.jpg";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import AddCardIcon from "@mui/icons-material/AddCard";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// import apis
import Plapi from "../../plapi";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

const Input = styled("input")({
  display: "none",
});

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      navigate: false,
      selectedImage: null,
    };
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {}

  render() {
    const { userObj, walletObject, navigate } = this.state;

    return (
      <Container sx={{ paddingTop: "4rem", height: "700px" }}>
        <Paper style={styles.paperContainer} className="main-card">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack>
                  <TextField
                    id="standard-size-normal"
                    label="first_name"
                    variant="standard"
                    name="first_name"
                    onChange={this.handleChange("first_name")}
                  />
                  <TextField
                    id="standard-size-normal"
                    label="last_name"
                    variant="standard"
                    name="last_name"
                    onChange={this.handleChange("last_name")}
                  />
                  <TextField
                    id="standard-size-normal"
                    label="email"
                    variant="standard"
                    name="email"
                    onChange={this.handleChange("email")}
                    fullWidth
                  />
                  <TextField
                    id="standard-size-normal"
                    label="mobile"
                    variant="standard"
                    name="mobile"
                    onChange={this.handleChange("mobile")}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={2} className="Box">
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={this.onFileChange}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <CameraFrontIcon
                          fontSize="large"
                          sx={{ color: "black" }}
                        />
                      </IconButton>
                      <Typography variant="caption">
                        {this.state.selectedImage?.name}
                      </Typography>
                    </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      sx={{
                        backgroundColor: "rgb(4 4 4)!important",
                        borderRadius: "20px",
                      }}
                      disableRipple
                      variant="contained"
                      type="submit"
                      onClick={this.updateData}
                    >
                      submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          {navigate ? <Navigate to="/profile" replace={true} /> : null}
        </Paper>
      </Container>
    );
  }
  onFileChange = (event) => {
    this.setState({ selectedImage: event.target.files[0] });
    console.log("file found" , event.target.files[0])
  };

  async loadData() {
    const userId = window.localStorage.getItem("userId");
    const res = await Plapi.User.getDetail(userId);
    if (!res.error) {
      this.setState({ userObj: res });
    }
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  async updateData() {
    const { first_name, last_name, email, mobile ,selectedImage } = this.state;
    var formdata = new FormData();
 

    if (first_name != "") {
      formdata.append("first_name" , first_name);
    }

    if (last_name != "") {
      formdata.append("last_name", last_name);

    }

    if (email != "") {
      formdata.append("email", email);

    }

    if (mobile != "") {
      formdata.append("mobile", mobile);
    }

    if (selectedImage != null) {
      formdata.append("profile_photo", selectedImage , selectedImage.name);
    }
    const userId = window.localStorage.getItem("userId");
    const res = Plapi.User.update(userId, formdata);
    if (!res.error) {
      this.setState({ navigate: true });
    }
  }
}
