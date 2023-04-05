import { Typography } from '@mui/material';
import Wave from 'react-wavify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "./Footer.css";
import React from 'react';

function Footer(): JSX.Element {
    return (
        <div className="Footer" style={{position:'relative', display: 'flex'}}>
			<Wave fill='#5EB4FF'
            paused={false}
            options={{
                zIndex: -1,
                height: 20,
                amplitude: 10,
                speed: 0.10,
                points: 5
            }}
            />
            <div className="footerLinks" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display:'flex', flexDirection:'column'}}>
                <Typography>
                    &copy; All rights reserved to Daniel Wieder
                    
                </Typography>
                <div style={{display:'flex', justifyContent:'center', gap:'2rem'}}>
                <span><a href="https://github.com/danielwieder94" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2xl" color='black'/>
                </a></span>
                <span><a href="https://www.facebook.com/daniel.wieder.98/" target="_blank" rel="noreferrer"> 
                <FontAwesomeIcon icon={faFacebook} size="2xl" color='black' />
                </a></span>
                <span><a href="https://www.linkedin.com/in/daniel-wieder-6299611ba/" target="_blank" rel="noreferrer"> 
                <FontAwesomeIcon icon={faLinkedin} size="2xl" color='black'/>
                </a></span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
