import React from 'react';
import css from "./Header.module.css"
import Link from "next/link";

const Header = () => {
    return (

            <div className={css.header}>
                <Link href={"/"}>
                <img className={css.logo} src={'./favicon.ico'} alt="red cross logo"/>

                </Link>
                <h1 className={css.heading}>#main_channel</h1>

            </div>

    );
};

export default Header;