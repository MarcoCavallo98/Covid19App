import React from 'react';

const Footer = () => (

    <div className="footer">
        <hr/>
        <p>
            @ {new Date().getFullYear()} - <a 
                href='https://cavallo-marco-page.herokuapp.com/' 
                target='_blank'
                rel="noopener noreferrer"
            >
                Cavallo Marco
            </a>
        </p>
        <p>
            Data provided by <a 
                href='https://www.mongodb.com'
                target='_blank'
                rel="noopener noreferrer"
            >
                MongoDB  
            </a> COVID-19 dataset - dataset updated daily by <a 
                href='https://www.jhu.edu/'
                target='_blank'
                rel="noopener noreferrer"
            >
                JHU (Johns Hopkins University)
            </a>
        </p>
    </div>

);

export default Footer;