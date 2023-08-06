import React from 'react';
import './ContentSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function ContentSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
}) {
  return (
    <>
      <div
        className={
          lightBg ? 'home__content-section' : 'home__content-section darkBg'
        }
      >
        <div className="container">
          <div
            className="row home__content-row"
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row',
            }}
          >
            <div className="col">
              <div className="home__content-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__content-subtitle'
                      : 'home__content-subtitle dark'
                  }
                >
                  {description}
                </p>
                <Link to="/signup">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__content-img-wrapper">
                <img src={img} alt={alt} className="home__content-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentSection;
