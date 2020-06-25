import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import HomeCard from './home-card';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CentreColumn = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  max-width: 600px;
  margin: auto;
`;

const ImageContainer = styled.div.attrs({
  className: 'animation-target'
})`
 @media only screen and (min-width: 600px) {
   margin: 20px;
  }
  display:flex;
  justify-content: center;
  margin: 20px;
`;

const Image = styled.img`
  border-radius: 3px;
`;

const Home = () => {
  const [animate, setAnimate] = useState(true);
  const history = useHistory();

  const navigateTo = (dest: string) => {
    gsap.to('.animation-target', {
      duration: 0.5,
      opacity: 0,
      y: -300,
      stagger: 0.3,
      ease: 'back.in',
      onComplete: () => history.push(dest)
    });
  };

  useEffect(() => {
    if (animate) {
      gsap.from('.animation-target', {
        duration: 2,
        scale: 0.3,
        opacity: 0,
        x: -300,
        stagger: 0.3,
        ease: 'power4',
        force3D: true
      });
      setAnimate(false);
    }
  });

  return (
    <MainContainer>
      <ImageContainer>
        <Image src='../../../assets/rob.jpg' alt='Rob JPG'/>
      </ImageContainer>
      <CentreColumn>
        <HomeCard id='homeCard'
                  header='About'
                  title='Rob Porter'
                  text='Experienced technologist, blah blah, blah'
                  buttonText='Work History'
                  buttonFn={() => navigateTo('/about')}/>

        <HomeCard id='skillsCard'
                  header='Skills'
                  title='Tech Showcase'
                  text='This site is built with my current idealised stack'
                  buttonText='View Stack'
                  buttonFn={() => navigateTo('/stack')}/>

        <HomeCard id='demoApp'
                  header='Demo'
                  title='Demo Application'
                  text='This todo shows some of hte tech working together'
                  buttonText='View Demo'
                  buttonFn={() => navigateTo('/todos')}/>

        <HomeCard id='contactCard'
                  header='Contact'
                  title='Get in touch'
                  text='Email me'
                  buttonText='Email'
                  buttonFn={() => navigateTo('/contact')}/>
      </CentreColumn>
    </MainContainer>
  );
};

export default Home;
