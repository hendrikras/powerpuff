import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkElement = styled(Link)`
background-color: palevioletred;
border: 1px solid #93291b;
border-radius: 3px 3px 3px 3px;
box-shadow: 0 0 1px #93291b inset;
color: white;
padding: 5px;
`;

export const Heading = styled.h1`
font-family: 'Enriqueta', arial, serif;
line-height: 1.25; margin: 0 0 10px;
font-size: 40px;
font-weight: bold;
@media (min-width: 320px) and (max-width: 780px) {
  font-size: 30px;
}
`;


export const CardHeading = styled.h2`
font-family: 'Enriqueta', arial, serif;
line-height: 1.25; margin: 0 0 10px;
font-size: 25px;
font-weight: bold;
@media (min-width: 320px) and (max-width: 780px) {
  font-size: 14px;
  line-height: 1.25; margin: 0 0 0;

}
`;


export const Paragraph = styled.span`
color: #333333;
font-family: "Helvetica Neue",Arial,sans-serif;
font-size: 16px;
font-weight: 300;
line-height: 1.5625;
margin-bottom: 15px

 @media (min-width: 320px) and (max-width: 780px) {
 font-size: 13px;
  font-weight: 200;
 }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  margin: 15px;
`;

export const Grid = styled.div`
  display: grid;
   grid-template-areas: "a";
   grid-gap: 10px;
   @media (min-width: 780px)  {
    grid-template-areas: "a a a";
  }
`;

export const GridItem = styled.div`
  grid-column-start: auto;
  grid-column-end: auto;
  
  grid-row-start: auto
  grid-row-end: auto
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 800px;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 780px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      order: 2;
    }
    section {
      order: 1;
    }
  }
`;

export const Button = styled.button`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 100%
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: top;
}
`;
