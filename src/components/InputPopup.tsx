import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import type { IItem } from "../types/menuListType";

const InputList = () => {
  const { setStorage } = useStorage("menuList");
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [slotCount, setSlotCount] = useState(1);

  const checkValidation = () => {
    if (slotCount > 10) {
      alert("정답 갯수는 최대 10개입니다.");
      return false;
    }

    if (slotCount <= 0) {
      alert("정답 갯수는 최소 1개 이상 작성해주세요.");
      return false;
    }

    if (questionList.length <= 0) {
      alert("문제 리스트는 최소 1개 이상 작성해주세요.");
      return false;
    }

    if (questionList.length < Number(slotCount)) {
      alert("정답 갯수와 문제 리스트보다 많을 순 없습니다.");
      return false;
    }

    return true;
  };

  const handleAdd = () => {
    if (checkValidation()) {
      const questionListData = questionList.map(
        (item: string) =>
          ({
            value: item,
            matched: false,
          } as IItem),
      );

      setStorage({
        answerCount: Number(slotCount),
        questionList: questionListData,
        selectedList: [],
        answerList: questionListData.sort(() => Math.random() - 0.5),
      });
    }
  };

  return (
    <section className='input-popup'>
      <div className='input-popup-container'>
        <label htmlFor='answer-count'>슬롯 갯수</label>
        <div className='slot-count-container'>
          <input
            type='number'
            value={slotCount}
            id='answer-count'
            onChange={(e) =>
              setSlotCount(Math.min(Math.max(Number(e.target.value), 1), 10))
            }
          />
          <button
            type='button'
            onClick={() =>
              setSlotCount((prevCount) => Math.max(prevCount - 1, 1))
            }>
            -
          </button>
          <button
            type='button'
            onClick={() =>
              setSlotCount((prevCount) => Math.min(prevCount + 1, 10))
            }>
            +
          </button>
        </div>
        <p>1~10</p>

        <label htmlFor='question-list'>문제 리스트</label>
        <div className='question-list-container'>
          {Array.from({ length: slotCount }, (_, index) => (
            <input
              id={`question-list-${index}`}
              key={index}
              type='text'
              value={questionList[index] || ""}
              onChange={(e) => {
                const updatedList = [...questionList];
                updatedList[index] = e.target.value;
                setQuestionList(updatedList);
              }}
            />
          ))}
        </div>

        <button
          className='add-button'
          type='button'
          onClick={() => handleAdd()}>
          리스트 생성
        </button>
      </div>
    </section>
  );
};

export default InputList;
