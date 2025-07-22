import { useState } from "react";

export function useStorage(key: string){
  // 1. 초기값 설명, 스토리지에 가지고 있는 데이터가 없으면 주요뉴스를 기본값으로 보여줌
  const [storage, setStorage] = useState(() => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [{"value" : "main_news", "label" : "주요뉴스"}];
  });

  // 2. 스토리지에 데이터를 저장하는 함수
  const setVale = (value: any) => {
    setStorage(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { storage, setVale };
}