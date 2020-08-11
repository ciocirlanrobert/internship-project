import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { useUserContext } from "../context/UserContext";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { UpdateContactInfo } from "../mutations";
import { UserContactInfo } from "../queries";
import { useMutation, useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  hero: {
    backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "45vh",
  },

  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    margin: "10px 0 5px 0",
  },

  email: {
    fontSize: "1em",
    fontWeight: "300",
    marginBottom: "50px",
  },
  menuButton: {
    margin: "10px 15px",
  },
  heroNavbar: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  mainInfo: {
    backgroundColor: "white",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  generalInfo: {
    padding: 0,
  },
  sectionTitle: {
    padding: 30,
  },

  formRow: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
  },

  label: {
    fontSize: 25,
  },
}));

const contactInfo = ["Email", "Phone", "Website", "City", "Country", "Avatar"];
const about = "test about";

export default function MyProfile() {
  const style = useStyles();
  const history = useHistory();
  const { user } = useUserContext();

  const [generalInfo, setGeneralInfo] = useState({
    Email: "",
    Phone: "",
    Website: "",
    City: "",
    Country: -1,
    Avatar: "",
  });

  const [updateContactInfo, { data: contactInfoData }] = useMutation(
    UpdateContactInfo
  );

  const { data: querriedContactInfo } = useQuery(UserContactInfo, {
    variables: {
      id: user.id,
    },
    onCompleted: () => {
      const {
        about,
        avatarUrl,
        city,
        country,
        email,
        phone,
        website,
      } = querriedContactInfo.user.contactInfo;

      const auxContactInfo = {
        Email: email,
        Phone: phone,
        Website: website,
        City: city,
        Country: country.name,
        Avatar: avatarUrl,
      };

      setGeneralInfo(auxContactInfo);
    },
  });

  const handleGeneralInfoSubmit = (event) => {
    event.preventDefault();
    updateContactInfo({
      variables: {
        email: generalInfo.Email,
        phone: generalInfo.Phone,
        city: generalInfo.City,
        website: generalInfo.Website,
        avatarUrl: generalInfo.Avatar,
        about: about,
        countryId: 4,
        id: user.contactInfoId,
      },
    });
  };

  const handleChange = (event) => {
    setGeneralInfo({
      ...generalInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className={style.hero}>
        <div className={style.heroNavbar}>
          <IconButton
            edge="start"
            className={style.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/landingPage");
            }}
          >
            <HomeIcon />
          </IconButton>
        </div>
        <div className={style.heroContent}>
          <div className={style.heroAvatar}>
            <Avatar
              alt="User"
              src="/static/images/avatar/1.jpg"
              className={style.large}
            />
          </div>
          <h1 className={style.userName}>
            {user.firstName + " " + user.lastName}
          </h1>
          <h3 className={style.email}>ciocirlan.r@mail.com</h3>
        </div>
      </div>
      <Container maxWidth="md" className={style.mainInfo} component="main">
        <h1 className={style.sectionTitle}>General Info</h1>
        <form className={style.generalInfo} onSubmit={handleGeneralInfoSubmit}>
          {generalInfo.Email !== "" &&
            contactInfo.map((item) => (
              <div className={style.formRow} key={item}>
                <label className={style.label}>{item}</label>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name={item}
                  autoComplete="off"
                  autoFocus
                  onChange={handleChange}
                  defaultValue={generalInfo[item]}
                />
              </div>
            ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            id="submit"
          >
            Save changes
          </Button>
        </form>
      </Container>
    </>
  );
}
