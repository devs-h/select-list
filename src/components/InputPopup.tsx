import { useContext, useMemo, useState, type FormEvent } from "react";
import type { IItem } from "../types/menuListType";
import { MenuListContext } from "../store/MenuListContext";
const checkValidation = (slotCount: number, questionList: string[]) => {
  const validations: { condition: boolean; message: string }[] = [
    { condition: slotCount > 10, message: "정답 갯수는 최대 10개입니다." },
    {
      condition: slotCount <= 0,
      message: "정답 갯수는 최소 1개 이상 작성해주세요.",
    },
    {
      condition: questionList.length <= 0,
      message: "문제 리스트는 최소 1개 이상 작성해주세요.",
    },
    {
      condition: questionList.length < Number(slotCount),
      message: "정답 갯수가 문제 리스트보다 많을 순 없습니다.",
    },
  ];

  for (const { condition, message } of validations) {
    if (condition) {
      return message;
    }
  }

  return false;
};
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function InputPopup() {
  const { setData } = useContext(MenuListContext);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [slotCount, setSlotCount] = useState(1);
  const isInvalid = useMemo(
    () => checkValidation(slotCount, questionList),
    [slotCount, questionList]
  );
  const handleAdd = () => {
    if (isInvalid) return alert(isInvalid);

    const questionListData = questionList.map(
      (item: string) =>
        ({
          value: item,
          matched: false,
        } as IItem)
    );

    setData({
      answerCount: Number(slotCount),
      questionList: questionListData,
      selectedList: [],
      answerList: questionListData.sort(() => Math.random() - 0.5),
    });
  };

  // 슬롯 수 업데이트 유틸
  const handleSlotCount = (updater: number | ((prev: number) => number)) => {
    setSlotCount((prev) => {
      const nextValue = typeof updater === "function" ? updater(prev) : updater;
      return clamp(nextValue, 1, 10);
    });
  };
  const handleInput = (e: FormEvent) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.tagName !== "INPUT") return;

    const indexAttr = target.id.replace("question-list-", "");
    const index = Number(indexAttr);
    if (isNaN(index)) return;

    const updatedList = [...questionList];
    updatedList[index] = target.value;
    setQuestionList(updatedList);
  };
  return (
    <section className="input-popup">
      <div className="input-popup-container">
        <label htmlFor="answer-count">슬롯 갯수</label>
        <div className="slot-count-container">
          <input
            type="number"
            value={slotCount}
            id="answer-count"
            onChange={(e) => handleSlotCount(Number(e.target.value))}
          />
          <button
            type="button"
            onClick={() => handleSlotCount((prev) => prev - 1)}
          >
            -
          </button>
          <button
            type="button"
            onClick={() => handleSlotCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <p>1~10</p>

        <label htmlFor="question-list">문제 리스트</label>
        <div className="question-list-container" onChangeCapture={handleInput}>
          {Array.from({ length: slotCount }, (_, index) => (
            <input
              id={`question-list-${index}`}
              key={index}
              type="text"
              value={questionList[index]}
            />
          ))}
        </div>

        <button className="add-button" type="button" onClick={handleAdd}>
          리스트 생성
        </button>
      </div>
    </section>
  );
}
