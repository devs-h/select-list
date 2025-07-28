import { useState, useRef } from 'react';
import type { Storage } from '../types/menuListType';
import list from '../assets/lists.json';

const generateRandomArray = (length: number): number[] => {
  const numbers = new Set<number>();

  while (numbers.size < length) {
    const randomNum = Math.floor(Math.random() * length);
    numbers.add(randomNum);
  }

  return Array.from(numbers);
};

const getMatchItems = (length: number) => {
  const randomIndex = generateRandomArray(length);
  const selectedItems = randomIndex.map(index => list[index]);
  return selectedItems;
};

export const useMatchingTargets = ({length}: {length: number}) => {
  const initialTargets = useRef<Array<Storage>>(getMatchItems(length));
  const [targets, setTargets] = useState<Array<Storage>>(initialTargets.current);

  const setMatchingTargets = (newLength: number) => {
    setTargets(getMatchItems(newLength));
  };

  return { matchingTargets: targets, setMatchingTargets };
};