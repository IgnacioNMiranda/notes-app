import './Home.css';
import React from "react";
import { NoteImage } from "../../utils/NoteImage";
import { SpacerWrap } from "../../utils/SpacerWrap";
import { MainTitle } from "../atoms/MainTitle";
import { Paragraph } from "../atoms/Paragraph";

export const Home = () => {
  return (
    <div className='home'>
      <MainTitle text="Notes application" extraClasses="homeTitle" />
      <SpacerWrap classes="my-80">
        <NoteImage />
      </SpacerWrap>
      <Paragraph text={`With just a title and the content you're ready to go!`} />
    </div>
  );
};
