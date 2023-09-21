import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <>
            <header>
                <div>
                    <Link to="/">
                        <span className="header-menu-text"> 홈</span>
                    </Link>
                </div>
                <div className="bar">&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                <div>
                    <Link to="/board">
                        <span className="header-menu-text"> 게시판</span>
                    </Link>
                </div>
            </header>
            <hr />
        </>
    )
}

export default Header
