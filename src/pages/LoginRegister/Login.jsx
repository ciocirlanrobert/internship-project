import React, { useState } from 'react'
import LoginRegisterSwitchers from '../../Components/LoginRegisterSwitch/LoginRegisterSwitchers'
import { useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { useToasts } from 'react-toast-notifications'
import { LOGIN_USERS } from './fetch/queries'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TextField from '@material-ui/core/TextField'
import './style/LoginRegisterForm.css'
import loginImage from '../../images/login.svg'

export default function Login() {
    const [userAuthentication, setUserAuthentication] = useState({})
    const history = useHistory()
    const { addToast } = useToasts()

    const { update } = useUserContext()

    const [getUsers, { data }] = useLazyQuery(LOGIN_USERS, {
        fetchPolicy: 'network-only',
        onCompleted: () => {
            const index = data.users.findIndex(
                (user) =>
                    user.username === userAuthentication.username &&
                    user.password === userAuthentication.password,
            )

            if (index !== -1) {
                update('password', userAuthentication.password)
                update('username', userAuthentication.username)
                update('firstName', data.users[index].firstName)
                update('lastName', data.users[index].lastName)
                update('userRoleId', data.users[index].userRole.id)
                update('id', data.users[index].id)
                update('contactInfoId', data.users[index].contactInfo.id)

                setTimeout(() => {
                    history.push('/landingPage')
                }, 600)

                addToast('Logged in succesfully!', {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                })
            } else {
                addToast('Invalid user or password!', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                })
            }
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        getUsers()
    }

    const handleChange = (e) => {
        e.persist()
        setUserAuthentication((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="loginRegisterBody">
            <Container component="main" maxWidth="xs" className="main">
                <LoginRegisterSwitchers />
                <Typography component="h1" variant="h4">
                    Log In
                </Typography>
                <div className="imageContainer">
                    <img src={loginImage} alt="Login" />
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VisibilityIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        id="submit"
                    >
                        Log In
                    </Button>
                </form>
            </Container>
        </div>
    )
}
