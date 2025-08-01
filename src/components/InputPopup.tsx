import { useState } from "react";
import type { MenuData } from "../types/menuListType";

const InputList = ({ setStorage }: { setStorage: (storage: MenuData) => void }) => {
  const [answerCount, setAnswerCount] = useState("");
  const [questionList, setQuestionList] = useState("");

  const checkValidation = () => {
    if(answerCount.length > 10) {
      alert("정답 갯수는 최대 10개입니다.");
      return false;
    }
    
    if(answerCount.length <= 0) {
      alert("정답 갯수는 최소 1개 이상 작성해주세요.");
      return false;
    }

    if(questionList.length <= 0) {
      alert("문제 리스트는 최소 1개 이상 작성해주세요.");
      return false;
    }

    if(questionList.split(",").length < Number(answerCount)) {
      alert("정답 갯수와 문제 리스트보다 많을 순 없습니다.");
      return false;
    }

    return true;
  }

  const handleAdd = () => {
    if(checkValidation()) {
      const answerList = Number(answerCount);
      const questionListData = questionList.split(",").map((item: string) => ({ value: item }));
      setStorage({answerCount: answerList, questionList: questionListData, selectList: []});  
      localStorage.setItem("menuList", JSON.stringify({answerCount: answerList, questionList: questionListData, selectList: []}));
    }
  }


  return (
    <section className="input-popup">
      <div className="input-popup-container">
        <label htmlFor="answer-count">정답 갯수</label>
        <input id="answer-count" type="numbers" value={answerCount} maxLength={10} onChange={(e) => setAnswerCount(e.target.value)} />
        <p>예시) 10 / 최대 10개</p> 

        <label htmlFor="question-list">문제 리스트</label>
        <input id="question-list" type="text" value={questionList} onChange={(e) => setQuestionList(e.target.value)} />
        <p>,로 구분하여 작성하세요.<br />예시) 1,2,3,4,5</p>

        <button type="button" onClick={() => handleAdd()}>추가</button>
      </div>
    </section>
  );
};

export default InputList;