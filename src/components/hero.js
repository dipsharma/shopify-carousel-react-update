import React from "react";
import HeroBannerLogo from "./../images/logo.png";
import HeroBannerMob from "./../images/hero-image--mobile.jpg";
import HeroBannerDesk from "./../images/hero-image--desktop.jpg";
import Button from 'react-bootstrap/Button';

function Hero() {
    return (
        <div>
            <div className="topBar">
                <div className="container">
                    <p>Spend £45 and get 2 free mini gins!</p>
                </div>
            </div>

            <div className="heroBanner">
                <picture className="mobile">
                    <source srcSet={`${HeroBannerMob} 1x`} media="(max-width: 100%)" />
                    <img
                        className="heroMob img-fluid"
                        srcSet={`${HeroBannerMob} 1x`}
                        alt="Hero Banner" />
                </picture>
                <picture className="desktop">
                    <source srcSet={`${HeroBannerDesk} 1x`} media="(max-width: 100%)" />
                    <img
                        className="heroDesktop img-fluid"
                        srcSet={`${HeroBannerDesk} 1x`}
                        alt="Hero Banner" />
                </picture>
                <div className="heroCaption">
                    <picture>
                        <source srcSet={`${HeroBannerLogo} 1x`} media="(max-width: 100%)" />
                        <img
                            className="heroDesktop img-fluid"
                            srcSet={`${HeroBannerLogo} 1x`}
                            alt="Hero Banner" />
                    </picture>

                    <h1>Gin & More<br/>to your door</h1>
                    <p>Discover the UK’s No 1 Gin Club</p>
                    <Button variant="primary" className="heroCta">Get Started</Button>
                    <Button variant="primary" className="heroCta">Give a Gift</Button>
                </div>
            </div>
        </div>
    );
}

export default Hero;  