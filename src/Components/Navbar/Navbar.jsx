import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { useUserContext } from '../../context/UserContext'
import Logo from '../../images/logos/logo_transparent.png'

export default function Navbar() {
    const history = useHistory()
    const { user } = useUserContext()
    const classes = useStyle()

    const handleClick = (event) => {
        history.push(event.currentTarget.dataset.path)
    }

    return (
        <AppBar position="static" className={classes.appBar} elevation={0}>
            <Toolbar className={classes.toolbar}>
                <IconButton edge="start" size="small" disabled>
                    <img
                        src={Logo}
                        alt="Logo"
                        className={classes.navbarLogo}
                    ></img>
                </IconButton>
                <Button
                    className={classes.link}
                    variant="outlined"
                    data-path="/login"
                    onClick={handleClick}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}

const useStyle = makeStyles((theme) => ({
    appBar: {
        background: 'none',
        margin: 10,
    },
    navbarLogo: {
        maxWidth: 80,
        flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    link: {
        background: 'none',
    },
}))
