import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";
import dayjs from "dayjs";

function lastDay(year, month) {
  return new Date(year, month, 0).getDate();
}

function App() {
  const [date, setDate] = useState(new Date());
  const [imageInfo, setImageInfo] = useState(null);

  const getImageInfo = async (date) => {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: "RWGkDc955LQfd2f7lhxO7Ic7oHbPu3SIMTenkp6I",
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      },
    });
    setDate(date);
    setImageInfo(response.data);
  };

  useEffect(() => {
    getImageInfo(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const yesterday = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (day > 1) {
      return getImageInfo(new Date(`${year}-${month + 1}-${day - 1}`));
    }
    if (month > 0) {
      return getImageInfo(new Date(`${year}-${month}-${lastDay(year, month)}`));
    }
    getImageInfo(new Date(`${year - 1}-${12}-${31}`));
  };

  const 내일 = () => {
    const dayjsDate = dayjs(date);
    getImageInfo(dayjsDate.add(1, "day").toDate());
  };

  if (!imageInfo) {
    return null;
  }

  return (
    <RootDiv>
      <button onClick={yesterday}>어제의 사진 보기</button>
      {imageInfo !== null &&
        (imageInfo.media_type === "image" ? (
          <img width="50%" src={imageInfo.url} alt="example" />
        ) : (
          <iframe title={imageInfo.title} height="50%" src={imageInfo.url} />
        ))}
      <button onClick={내일}>내일의 사진 보기</button>
    </RootDiv>
  );
}

const RootDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default App;
