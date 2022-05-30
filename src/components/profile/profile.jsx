// component
import { Component } from "react";
import "./profile.css";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

//import custom
import Table from "./transaction";

// icon
import ProfilePic from "../../assets/profile2.jpg"
import { FaPhone } from "react-icons/fa";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";


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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {},
      walletObject: {},
      TransactionObject :[]
    };
  }
  async componentDidMount() {
    await this.loadData();
    await this._loadWalletData();
    await this.loadTransactionData();
  }

  render() {
    const { userObj, walletObject } = this.state;

    return (
      <Container sx={{ paddingTop: "4rem", height: "700px" }}>
        <Paper style={styles.paperContainer} className="main-card">
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <List dense={true}>
                  <ListItem>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "URW Chancery L, cursive",
                        fontWeight: 550,
                      }}
                    >
                      {`${userObj?.first_name} ${userObj?.last_name}`}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <MailIcon />
                    <ListItemText secondary={userObj?.email} />
                  </ListItem>
                  <ListItem>
                    <CallIcon />
                    <ListItemText secondary={userObj?.mobile} />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={4} className="Box">
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Avatar
                      src={userObj?.profile_photo}
                      alt="Remy Sharp"
                      variant="sqaure"
                      style={{
                        width: "95px",
                        height: "95px",
                        borderRadius: "25px",
                      }}
                    />
                  </IconButton>
                </label>
              </Grid>

              <Grid item xs={1}>
                <Avatar className="rupee-image">
                  <Typography variant="h5" className="rotate">
                    ₹{" "}
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item xs={8} className="user-info" marginTop={2}>
                <Typography className="balance-info">
                  {" "}
                  Balance :{`₹ ${walletObject?.cur_balance}`}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton size="large" href="/payment">
                  <AddCardIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton size="large" href="/profile_form">
                  <SettingsIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
        <CardContent></CardContent>
        <Paper
          style={styles.paperContainer}
          className="main-card"
          sx={{ marginTop: "-0.5rem" }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: "Sans-serif" }}>
              TRANSACTION HISTORY
            </Typography>
            { (this.state.TransactionObject).length>0 ? ( <Table transactions={this.state.TransactionObject} />):
            (<Typography> NO TRANSACTION HISTORY</Typography> ) }
          </CardContent>
        </Paper>
      </Container>
    );
  }
  async loadData() {
    const userId = window.localStorage.getItem("userId");
    const res = await Plapi.User.getDetail(userId);
    if (!res.error) {
      this.setState({ userObj: res });
    }
  }

  async _loadWalletData() {
    const userId = window.localStorage.getItem("userId");
    const wallet = await Plapi.Wallet.getDetail(userId);
    if (!wallet.error) {
      this.setState({ walletObject: wallet[0] });
      window.sessionStorage.setItem("wb", wallet[0]?.cur_balance);
    } else {
      console.log("profile of given id was not provided");
      // there should be some fall back content here.
    }
  }
  async loadTransactionData() {
    const userId = window.localStorage.getItem("userId");
    const wallet = await Plapi.Wallet.getTransaction(userId);
    if (!wallet.error) {
      this.setState({ TransactionObject: wallet});
    } else {
      console.log("transaction of given id was not provided");
      // there should be some fall back content here.
    }
  }
}
