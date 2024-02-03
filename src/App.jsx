import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { v4 as uuid } from "uuid";

import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    Authorization: "Bearer udrHh2cyRLl3UNoCnV7fSPpzw",
  },
  responseType: "json",
});

function postData(data) {
  const re = API.post("/faraway", data)
    .then((result) => {
      console.log("data post:", data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// getData();

const initData = JSON.parse(localStorage.getItem("far-away")) || [];
// const initData = [];

function App() {
  const [appState, setAppState] = useState([]);
  const status = useRef("loading");

  useEffect(function getData() {
    API.get("/faraway")
      .then((result) => {
        status.current == "loading" && setAppState(result.data);
        status.current = "ready";
        console.log("result", result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(
    function saveData() {
      console.log(appState);
      appState.length > 0 && postData(appState);
      localStorage.setItem("far-away", JSON.stringify(appState));
    },
    [appState]
  );

  const ctrl = {
    addItem(data) {
      setAppState((state) => [...state, { ...data, uuid: uuid(), completed: false, order: state.length + 1 }]);
    },

    removeItem(id) {
      setAppState((state) => state.filter((item) => item.uuid !== id));
    },

    itemPacked(id) {
      setAppState((state) => {
        const newState = [...state];
        const i = state.findIndex((item) => item.uuid == id);
        newState[i].completed = !state[i].completed;
        return newState;
      });
    },

    removeAllItems() {
      const res = prompt("Do you want remove all the items? (y/n)").toLocaleLowerCase();
      if (res == "y") {
        setAppState(() => []);
      } else if (res == "n") {
        return;
      } else {
        alert("Invalid input");
      }
    },

    sortItems: {
      sortByAddition() {
        setAppState((state) => [...state].sort((a, b) => b.order - a.order));
      },

      sortByDescription() {
        setAppState((state) =>
          [...state].sort((a, b) => {
            if (a.description > b.description) return 1;
            if (a.description < b.description) return -1;
            return 0;
          })
        );
      },

      sortByStatus() {
        setAppState((state) => [...state].sort((a) => (a.completed ? 1 : -1)));
      },
    },
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={ctrl.addItem} />
      {status.current == "loading" ? (
        "loading"
      ) : (
        <>
          <PackingList
            itemsData={appState}
            removeItem={ctrl.removeItem}
            itemPacked={ctrl.itemPacked}
            sortItems={ctrl.sortItems}
            removeAllItems={ctrl.removeAllItems}
          />
          <Stats itemsData={appState} />
        </>
      )}
    </div>
  );
}

export default App;
