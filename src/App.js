import React, { useState, useEffect } from "react";
import "./App.css";
const getLocalItems = () => {
  const list = localStorage.getItem("lists");
  if (!list || list === "undefined") return [];
  try {
    return JSON.parse(list) || [];
  } catch (error) {
    return [];
  }
};
function App() {
  const [InputList, setInputList] = useState("");
  const [Items, setItems] = useState(getLocalItems());
  const [show, setshow] = useState(false);
  const [edititemid, seteditItemid] = useState(null);

  const itemEvent = (event) => {
    setInputList(event.target.value);

    //console.log(event.target.value);
  };
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      //console.log(event.target.value);
      if (!InputList) {
        alert("Please Enter data");
      } else if (InputList && !show) {
        const inputdata = {
          id: new Date().getTime(),
          name: InputList,
        };
        setItems((oldItems) => {
          return [...oldItems, inputdata];
        });
        setInputList("");
      } else {
        setItems(
          Items.map((elem) => {
            if (elem.id === edititemid) {
              return { ...elem, name: InputList };
            }
            return elem;
          })
        );
        setshow(false);
        setInputList(" ");
      }
    }
  };
  const listOfItems = () => {
    if (!InputList) {
      alert("Please Enter data");
    } else {
      const inputdata = { id: new Date().getTime(), name: InputList };
      setItems((oldItems) => {
        return [...oldItems, inputdata];
      });
      setInputList("");
    }
  };
  const editItem = (id) => {
    const editItem = Items.find((elem) => {
      return id === elem.id;
    });
    setshow(true);
    setInputList(editItem.name);
    seteditItemid(editItem.id);
    console.log(editItem);
  };
  const deleteItems = (id) => {
    console.log(id);

    const updatedItems = Items.filter((elem) => {
      return id !== elem.id;
    });
    //console.log(updatedItems);
    setItems(updatedItems);
  };
  const AddEditedItem = (id) => {
    //editItem.name = InputList;

    setItems(
      Items.map((elem) => {
        if (elem.id === id) {
          return { ...elem, name: InputList };
        }
        return elem;
      })
    );
    setshow(false);
    setInputList(" ");
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(Items));
  }, [Items]);
  return (
    <div className="App">
      <center>
        <div className="maindiv">
          <br />
          <div className="mainheading">
            <h1>TODO List</h1>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="add text"
            value={InputList}
            onChange={itemEvent}
            onKeyDown={pressEnter}
          />
          <br />
          {show ? (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                AddEditedItem(edititemid);
              }}
            >
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={listOfItems}>
              Add
            </button>
          )}
          <br />

          {/* <li>{InputList}</li>*/}
          {Items && Items.map
            ? Items.map((itemval, index) => {
                return (
                  <div key={index}>
                    <br />
                    {itemval ? (
                      <div className="item" key={itemval.id}>
                        {itemval ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteItems(itemval.id);
                            }}
                          >
                            Delete
                          </button>
                        ) : null}
                        &nbsp;&nbsp;
                        {itemval ? <strong>{itemval.name}</strong> : "ff"}
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            editItem(itemval.id);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      "gg"
                    )}
                    <br />
                  </div>
                );
              })
            : null}
        </div>
      </center>
    </div>
  );
}

export default App;
