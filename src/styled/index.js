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
text-align: center;
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
margin: 15px

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
  margin: 15px auto;
`;

export const Grid = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  grid-gap: 15px;
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
  text-align: left;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 100%
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: top;
  outline: 0;
}
`;

export const Input = styled.input`
-webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px/1 'Open Sans', sans-serif;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  max-width: 500px;
  background-color: #ddd;
  border: none;
  padding: 10px 11px 11px 11px;
  border-radius: 3px;
  box-shadow: none;
  outline: none;
  margin: 10px auto;
  box-sizing: border-box;
  width: 100%
`;
