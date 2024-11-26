import React from "react";
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <a className={ styles.link} href='https://github.com/bravovo' target="_blank" rel="noopener noreferrer">Made by bravovo</a>
        </div>
    );
};

export default Footer;
