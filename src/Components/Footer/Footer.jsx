import React from 'react'
import { IconButton } from '@material-ui/core'
import { Facebook, GitHub, LinkedIn, Twitter } from '@material-ui/icons'
import Logo from '../../images/logos/logo_transparent.png'
import './style/style.css'

export default function Footer() {
    return (
        <div className="footer">
            <IconButton disabled>
                <img src={Logo} className="footer__logo" alt="Footer logo" />
            </IconButton>
            <div className="footer__copyright">
                &copy; Copyright 2020. Powered by Robert Ciocirlan
            </div>
            <div className="footer__socials">
                <a
                    href="https://www.facebook.com/profile.php?id=100010718796079"
                    rel="noreferrer"
                    target="_blank"
                >
                    <Facebook color="primary" id="footer__facebook" />
                </a>
                <a
                    href="https://twitter.com/ciocirlan_r"
                    rel="noreferrer"
                    target="_blank"
                >
                    <Twitter color="primary" id="footer__twitter" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ciocirlanrobert/"
                    rel="noreferrer"
                    target="_blank"
                >
                    <LinkedIn color="primary" id="footer__linkedin" />
                </a>
                <a
                    href="https://github.com/ciocirlanrobert"
                    rel="noreferrer"
                    target="_blank"
                >
                    <GitHub color="primary" id="footer__github" />
                </a>
            </div>
        </div>
    )
}
