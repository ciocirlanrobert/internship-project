import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import {
    NEW_REGISTERED_USER,
    NEW_REGISTERED_CONTACTINFO,
    UPDATE_NEW_CONTACTINFO,
} from './fetch/mutations'
import { LOGIN_USERS } from './fetch/queries'
import { useToasts } from 'react-toast-notifications'
import LoginRegisterSwitchers from '../../Components/LoginRegisterSwitch/LoginRegisterSwitchers'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import registerImage from '../../images/register.svg'
import './style/LoginRegisterForm.css'

export default function Register() {
    const [userRegistration, setUserRegistration] = useState({})

    const history = useHistory()

    const { addToast } = useToasts()

    const [createNewUser] = useMutation(NEW_REGISTERED_USER, {
        variables: {
            username: userRegistration.username,
            password: userRegistration.password,
            firstName: userRegistration.firstName,
            lastName: userRegistration.lastName,
            userRoleId: 1,
        },
    })

    const [createNewRegisteredContactInfo] = useMutation(
        NEW_REGISTERED_CONTACTINFO,
    )

    const [updateNewContactInfo] = useMutation(UPDATE_NEW_CONTACTINFO)

    const [getUsers, { data }] = useLazyQuery(LOGIN_USERS, {
        fetchPolicy: 'network-only',
        onCompleted: () => {
            const index = data.users.findIndex(
                (user) =>
                    user.username === userRegistration.username &&
                    user.password === userRegistration.password,
            )

            if (index === -1) {
                createNewUser().then((newUser) => {
                    const userId = newUser.data.createUser.id
                    createNewRegisteredContactInfo({
                        variables: {
                            email: '',
                            phone: '',
                            city: '',
                            website: '',
                            avatarUrl: '',
                            about: '',
                            countryId: 3,
                        },
                    })
                        .then((newContactInfo) => {
                            updateNewContactInfo({
                                variables: {
                                    id: userId,
                                    contactInfoId:
                                        newContactInfo.data.createContactInfo
                                            .id,
                                },
                            })
                        })
                        .then(() => {
                            setTimeout(() => {
                                history.push('/login')
                            }, 1000)

                            addToast(
                                'Congratulations, your account has been successfully created.',
                                {
                                    appearance: 'success',
                                    autoDismiss: true,
                                    autoDismissTimeout: 3000,
                                },
                            )
                        })
                })
            } else {
                addToast('User already taken.', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 2000,
                })
            }
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        getUsers()
    }

    const handleChange = (e) => {
        e.persist()
        setUserRegistration((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="loginRegisterBody">
            <Container component="main" maxWidth="xs" className="main">
                <LoginRegisterSwitchers />
                <Typography component="h1" variant="h4">
                    Register
                </Typography>
                <div className="imageContainer" style={{ margin: '3%' }}>
                    <img src={registerImage} alt="Register" />
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="name">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="firstname"
                            name="firstName"
                            label="Firstname"
                            autoComplete="off"
                            autoFocus
                            style={{ marginRight: '10px' }}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="lastname"
                            name="lastName"
                            label="Lastname"
                            autoComplete="off"
                            autoFocus
                            onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
    )
}
