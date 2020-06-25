import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const BaseCard = styled(Card).attrs({
  className: 'animation-target'
})`
 @media only screen and (min-width: 600px) {
   margin: 20px;
  }

  width: 260px;
  height: 280px;
  margin: 10px;
`;

interface HomeCardProps {
  id: string,
  header: string,
  title: string,
  text: string,
  buttonText: string,
  buttonFn: () => void
}

const HomeCard = (props: HomeCardProps) => {

  const highlight = (id: string) => {
    gsap.to(id, {
      duration: 0.3,
      boxShadow: '0px 0px 5px 2px',
      ease: 'back'
    });
  };

  const deHighlight = (id: string) => {
    gsap.to(id, {
      duration: 0.3,
      borderColor: 'rgba(0, 0, 0, .125)',
      borderWidth: 1,
      boxShadow: '0px 0px 0px 0px'
    });
  };


  const idSelector = `#${props.id}`;

  return (
    <BaseCard id={props.id}
            onMouseOver={() => highlight(idSelector)}
            onMouseOut={() => deHighlight(idSelector)}>
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
        <Button onClick={props.buttonFn}
                variant="primary">{props.buttonText}</Button>
      </Card.Body>
    </BaseCard>
  );

};

export default HomeCard;
