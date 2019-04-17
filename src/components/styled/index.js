import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PRIMARY_COLOR = '#db7093';

export const LinkElement = styled(Link)`
  background-color: ${PRIMARY_COLOR};
  border: 1px solid #93291b;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 1px #93291b inset;
  color: #fff;
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
    line-height: 1.25; 
  }
`;


export const Paragraph = styled.span`
  position: relative;
  top: -20px;
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
  background: ${({ primary }) => (primary ? PRIMARY_COLOR : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : PRIMARY_COLOR)};
  text-align: left;
  font-size: 1em;
  border: 2px solid ${PRIMARY_COLOR};
  border-radius: 3px;
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


export const StyledModal = styled.div`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 80%;
    margin: 0px auto; 
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .modal-header h3 {
    color: grey;
  }

  .modal-body {
    width: 100%;
    margin: 10px;
  }

  &.modal-enter {
    opacity: 0;
  }

  &.modal-exit {
    opacity: 0;
  }

  .modal-footer {
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background: white;
    box-shadow: 0 -3px 6px 0 rgba(18, 19, 18, 0.09);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &.modal-enter .modal-container,
  &.modal-exit .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

export const Spacer = styled.div`
  margin: 15px auto;
  background-color: ${PRIMARY_COLOR};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  color: #fff;
  position: relative;
`;

export const Title = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
