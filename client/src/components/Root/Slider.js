import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles({
  btn: {
    height: "5vh",
    width: "5vw",
    cursor: "pointer",
    padding: "1rem 2.5rem 1.125rem",
  },
});

export const Slider = ({ slideData }) => {
  const classes = useStyles();

  const [state, setState] = useState({ current: slideData.length / 2 });

  const handlePreviousClick = () => {
    const previous = state.current - 1;

    setState({
      current: previous < 0 ? slideData.length - 1 : previous,
    });
  };

  const handleNextClick = () => {
    const next = state.current + 1;

    setState({
      current: next === slideData.length ? 0 : next,
    });
  };

  const { current } = state;
  const wrapperTransform = {
    transform: `translateX(-${current * (100 / slideData.length)}%)`,
  };

  return (
    <div className="slider">
      <ul className="slider__wrapper" style={wrapperTransform}>
        {slideData.map((slide, index) => {
          return (
            <Slide
              key={index}
              slide={slide}
              current={current}
              index={index}
              handleNextClick={handleNextClick}
              handlePreviousClick={handlePreviousClick}
            />
          );
        })}
      </ul>

      <div className="slider__controls">
        <NavigateBeforeIcon
          onClick={handlePreviousClick}
          className={classes.btn}
        />
        <NavigateNextIcon onClick={handleNextClick} className={classes.btn} />
      </div>
    </div>
  );
};

const Slide = (props) => {
  const slide = React.createRef();

  const imageLoaded = (e) => (e.target.style.opacity = 1);

  const handleClick = (e) => {
    props.index > props.current
      ? props.handleNextClick()
      : props.index < props.current
      ? props.handlePreviousClick()
      : null;
  };

  const { src, headline } = props.slide;
  const current = props.current;
  let classNames = "slide";

  if (current === props.index) classNames += " slide--current";
  else if (current - 1 === props.index) classNames += " slide--previous";
  else if (current + 1 === props.index) classNames += " slide--next";

  return (
    <li ref={slide} className={classNames} onClick={handleClick}>
      <div className="slide__image-wrapper">
        <img
          className="slide__image"
          alt={headline}
          src={src}
          onLoad={imageLoaded}
        />
      </div>
    </li>
  );
};
