import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredColor, setEnteredColor] = useState("");
  const [Arr, setArr] = useState([]);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredColorTouched, setEnteredColorTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const formRef = useRef("");

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredColorIsValid = enteredColor.trim() !== "";

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const colorInputIsInvalid = !enteredColorIsValid && enteredColorTouched;

  useEffect(() => {
    if (enteredNameIsValid && enteredColorIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredColorIsValid]);

  const nameInputChangeHandeler = (event) => {
    setEnteredName(event.target.value);
  };

  const colorInputChangeHandeler = (event) => {
    setEnteredColor(event.target.value);
  };

  const nameInputBlurHandeler = (event) => {
    setEnteredNameTouched(true);
  };

  const colorInputBlurHandeler = (event) => {
    setEnteredColorTouched(true);
  };
  const formSubmissionhandler = (event) => {
    event.preventDefault();

    if (isEditing) {
      let clonedArr = [...Arr];
      clonedArr[editingIndex] = { name: enteredName, color: enteredColor };
      setArr(clonedArr);
      setIsEditing(false);
      setEditingIndex(-1);
    } else {
      const allNames = Arr.map((obj) => obj.name);

      if (allNames.includes(enteredName)) {
        alert("Name already exists");
      } else {
        setArr([...Arr, { name: enteredName, color: enteredColor }]);
        console.log("new Arr added" + JSON.stringify(Arr));
      }
    }

    setEnteredName("");
    setEnteredColor("");
    setEnteredNameTouched(false);
    setEnteredColorTouched(false);

    formRef.current.reset();
  };

  const formClearHandler = () => {
    setIsEditing(false);
    setEditingIndex(-1);
    setEnteredName("");
    setEnteredColor("");
    setEnteredNameTouched(false);
    setEnteredColorTouched(false);
    formRef.current.reset();
  };

  // const deleteHandler = (index) => {
  //   var result = window.confirm("Want to delete?");
  //   if (result) {
  //     setArr(Arr.filter((obj, i) => i !== index));
  //   }
  // };

  const deleteHandler = (index) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      let clonedArr = [...Arr];
      clonedArr.splice(index, 1);
      setArr(clonedArr);
    }
  };

  const updateHandler = (item, index) => {
    setEnteredName(item.name);
    setEnteredColor(item.color);
    setIsEditing(true);
    setEditingIndex(index);
  };
  return (
    <div className="App">
      <form ref={formRef} action="" onSubmit={formSubmissionhandler}>
        <label htmlFor="Name">Name</label> &nbsp;
        {/* <p>Two way binding :- {enteredName}</p> */}
        <input
          type="text"
          name="name"
          className=""
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandeler}
          onBlur={nameInputBlurHandeler}
        ></input>
        {nameInputIsInvalid && (
          <p style={{ color: "red" }}>Name Must not be empty.</p>
        )}
        &nbsp;&nbsp;
        <label htmlFor="Name">Color</label> &nbsp;
        <select
          name="color"
          className=""
          onChange={colorInputChangeHandeler}
          onBlur={colorInputBlurHandeler}
          value={enteredColor}
        >
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
        </select>
        {colorInputIsInvalid && (
          <p style={{ color: "red" }}>Please select the color.</p>
        )}
        &nbsp;&nbsp;
        <button type="submit">Save</button> &nbsp;&nbsp;
        <button type="button" onClick={formClearHandler}>
          Clear
        </button>{" "}
        &nbsp;&nbsp;
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Arr.length > 0 &&
            Arr.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{`${item.color}`}</td>
                  <td>
                    <button onClick={() => updateHandler(item, index)}>
                      Update
                    </button>
                    |
                    <button onClick={() => deleteHandler(index)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <p>Red: {Arr.filter((obj) => obj.color === "Red").length}</p>
      <p>Green: {Arr.filter((obj) => obj.color === "Green").length}</p>
      <p>Blue: {Arr.filter((obj) => obj.color === "Blue").length}</p>
    </div>
  );
}

export default App;
