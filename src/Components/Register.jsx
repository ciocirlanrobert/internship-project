import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import LoginRegisterSwitchers from "./LoginRegisterSwitchers";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CreateContactInfo, UpdateUserContactInfo } from "../mutations";

const useStyles = makeStyles({
  firstName: {
    marginRight: "10px",
  },
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const userRoleId = 3;

  const USER = gql`
  mutation {
      createUser(
          username: "${username}"
          firstName: "${firstName}"
          lastName: "${lastName}"
          password: "${password}"
          userRoleId: ${userRoleId}
      ) {
		  id
      }
  }
  `;

  const styles = useStyles();

  const [addUser, { data }] = useMutation(USER);
  const [createContactinfo, { data: contactInfo }] = useMutation(
    CreateContactInfo
  );
  const [updateMockContactInfo, { data: contactInfoData }] = useMutation(
    UpdateUserContactInfo
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    addUser().then((response) => {
      const userId = response.data.createUser.id;
      createContactinfo({
        variables: {
          email: "mockemail@mail.com",
          phone: "0700 000 000",
          city: "Mock",
          website: "website.com",
          avatarUrl: "avatar.com",
          about: "lorem ipsum",
          countryId: 3,
        },
      }).then((response) => {
        updateMockContactInfo({
          variables: {
            id: userId,
            contactInfoId: response.data.createContactInfo.id,
          },
        });
      });
    });
  };

  return (
    <div className="loginRegisterBody">
      <Container component="main" maxWidth="xs" className="main">
        <LoginRegisterSwitchers />
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <div className="name">
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="firstname"
              name="firstname"
              label="Firstname"
              autoComplete="off"
              autoFocus
              className={styles.firstName}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="lastname"
              name="lastname"
              label="Lastname"
              autoComplete="off"
              autoFocus
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            autoComplete="off"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            id="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
}
