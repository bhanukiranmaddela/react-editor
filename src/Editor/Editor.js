import React, { useState } from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import "./Editor.css";
import { useEffect } from "react";
const Editor = () => {
  const [startPointer, setStartPointer] = useState(0);
  const [text, setText] = useState("");
  const [allText, setAllText] = useState("");
  const [enter, setEnter] = useState(false);
  //   const formatData = () => {
  //     return (
  //       <div>
  //         <h1 style={{ fontWeight: "50px", textDecoration: "underline" }}>
  //           {allText}
  //         </h1>
  //         {enter && <br />}
  //       </div>
  //     );
  //   };
  useEffect(() => {
    setText(allText.slice(startPointer, allText.length));
    setEnter(false);
  }, [text]);

  useEffect(() => {
    setStartPointer(allText.length);
    console.log(startPointer, "startPointer");
  }, [enter]);

  const checkRegex = (temp) => {
    let headOne = /^#{1}/;
    let headTwo = /^#{2}/g;
    let headThree = /^#{3}/g;
    console.log(temp, "----------");
    if (headThree.test(temp) && !enter) {
      let res = temp.split(headThree)[1];
      //console.log(res, "Head three regex");
    } else if (headTwo.test()) {
      let res = temp.split(headTwo)[1];
      //console.log(res, "Head two regex");
    } else if (headOne.test(temp)) {
      let res = temp.split(headOne)[1];
      // console.log(res, "head one regex");
    }
  };
  const processText = (e) => {
    setAllText(e.target.value);
    console.log(allText,startPointer, allText.length, "pointer");
    if (enter) {
      if (text.trim() === "") {
        setStartPointer(0);
      } else {
        setStartPointer(allText.length);
      }

      // console.log(startPointer, "startpointer", allText.length, "length");
      if (text.trim() === "") {
        // console.log(allText.slice(startPointer, allText.length), text);
      } else {
        setText(text + "\n" + allText.slice(startPointer, allText.length));
        setEnter(false);
      }
      if (text.trim() !== "") {
      //  checkRegex(allText.slice(startPointer, allText.length ));
      }
    } else {
      if (text.trim() === "") {
      //  checkRegex(e.target.value);
      } else {
      //  checkRegex(allText.slice(startPointer, allText.length ));
      }
      //  console.log(text + allText.slice(startPointer, allText.length));
    }
    //let eachLine = allText.slice(startPointer, allText.length);
    checkRegex(allText.slice(startPointer,allText.length))
    if (allText.trim() === "") {
      setText("");
      setEnter(false);
    }
  };

  return (
    <div className="top">
      <div className="editor">
        <div className="editor-header">
          <p className="editor-name">Editor</p>
          <ZoomOutMapIcon />
        </div>
        <div className="editor-body">
          <textarea
            name="editor"
            value={allText}
            onKeyDown={(e) => {
              setEnter(e.keyCode === 13 ? true : false);
            }}
            onChange={(e) => processText(e)}
            cols="60"
            rows="15"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default Editor;
