import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import './App.css';
import img from './img/index_img.png';
import img2 from './img/Faker.gif';

function App() {
  const [leftText, setLeftText] = useState(''); // 왼쪽 문구 상태
  const [rightText, setRightText] = useState(''); // 오른쪽 문구 상태
  const leftFullText = 'DeeepFake : DeepLearning + Fake'; // 왼쪽 문구 전체
  const rightFullText = ' 딥러닝 기술을 사용하는 인간 이미지 합성 기술'; // 오른쪽 문구 전체
  
  // 왼쪽 문구 타이핑 효과
  useEffect(() => {
    let leftIndex = 0;
    let rightIndex = 0;
    const Interval = setInterval(() => {
      if (leftIndex < leftFullText.length-1) {
        setLeftText(prev => prev + leftFullText[leftIndex]);
        leftIndex++;
      } else if (rightIndex < rightFullText.length-1) {
        setRightText(prev => prev + rightFullText[rightIndex]);
        rightIndex++;
      }
    }, 100); // 타이핑 속도 (100ms)

    return () => {clearInterval(Interval)};// 컴포넌트 언마운트 시 클리어
  }, []);

  return(
    <div>
      <div className="banner">
        <div className="left">Safe from</div>
        <div className="right">Deepfake</div>
        <img id='image' src={img}/>
        <div className="leftText">{leftText}</div>
        <div className="rightText">{rightText}</div>    
        </div>
 
      <div className="infoText">
        <p>Faker는 딥페이크의 악용방지를 위한 사이트입니다.</p>
        <p>사진을 업로드 하면 딥페이크 모델이 정상적으로 작동하지 않는 사진으로 변환해 드립니다.</p>
        <p>눈으로 보았을 때 원본과 차이가 없으니 걱정마세요!</p>
      </div>
      <img src={img2} loop='once'/>

      
    </div>
  );
}

export default App;