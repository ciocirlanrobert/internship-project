import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export default function LoginRegisterSwitchers() {
    const classes = useStyles()
    const history = useHistory()

    const handleClick = (e) => history.push(e.currentTarget.dataset.path)

    return (
        <div className={classes.switchContainer}>
            <Button
                className={classes.switch}
                type="submit"
                color="primary"
                variant="outlined"
                data-path="/login"
                onClick={handleClick}
            >
                Login
            </Button>
            <Button
                className={classes.switch}
                type="submit"
                color="primary"
                variant="outlined"
                data-path="/register"
                onClick={handleClick}
            >
                Register
            </Button>
        </div>
    )
}

const useStyles = makeStyles({
    switch: {
        padding: '10px 30px',
        margin: '20px 10px',
    },

    switchContainer: {
        margin: '30px',
    },
})
