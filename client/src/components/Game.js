import React from 'react';
import styled from 'styled-components';
import themes from '../themes';
import noimage from '../img/noimage.jpg';

function Game({ values }) {
  const theme = themes;

  const { name, background_image } = values;

  return (
    <GameStyled theme={theme}>
      <div className='image'>
        <img
          alt={`${name}`}
          layout={'fill'}
          objectFit={'cover'}
          src={!background_image ? noimage : background_image}
          style={{
            borderRadius: theme.borderRadiusSm,
          }}
        />
      </div>
      <div className='title'>
        <h1>{name}</h1>
      </div>
    </GameStyled>
  );
}

const GameStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: ${(props) => props.theme.borderRadiusSm};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  img {
    transition: all 0.3s ease-in-out;
    border-radius: ${(props) => props.theme.borderRadiusSm};
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    transform: translateY(-5px);
    img {
      transform: scale(1.1);
    }
  }
  .image {
    height: 500px;
    position: relative;
  }

  .title {
    padding: 2rem;
  }
`;

export default Game;
