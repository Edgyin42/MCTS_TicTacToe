import { useState } from 'react';

const CharacterBox = ({ mood = 'neutral' }) => {
  const getPosition = () => {
    const positions = {
      'pointing-up': 'bg-[0%_0%]',
      'confused-smile': 'bg-[33.33%_0%]',
      'explaining': 'bg-[66.66%_0%]',
      'stern': 'bg-[100%_0%]',
      'confused-point': 'bg-[0%_50%]',
      'neutral': 'bg-[33.33%_50%]',
      'calm': 'bg-[66.66%_50%]',
      'open-hand': 'bg-[100%_50%]',
      'questioning': 'bg-[0%_100%]',
      'shocked': 'bg-[33.33%_100%]',
      'excited': 'bg-[66.66%_100%]',
      'idea': 'bg-[100%_100%]'
    };
    
    return positions[mood] || positions.neutral;
  };
  
  return (
    <div 
      className={`w-[150px] h-[150px] bg-no-repeat inline-block bg-[url('/public/character_sprites.png')] bg-[length:400%_300%] hover:-translate-y-1 transition-transform ${getPosition()}`}
    />
  );
};

export default CharacterBox;
