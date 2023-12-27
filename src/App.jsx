import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { v4 as uuid } from "uuid";

const initData = JSON.parse(localStorage.getItem("far-away")) || [];

function App() {
  const [appState, setAppState] = useState(initData);

  useEffect(() => saveData(), [appState]);

  function saveData() {
    localStorage.setItem("far-away", JSON.stringify(appState));
  }

  const ctrl = {
    addItem(data) {
      setAppState((state) => [...state, { ...data, id: uuid(), completed: false, order: state.length + 1 }]);
    },

    removeItem(id) {
      setAppState((state) => state.filter((item) => item.id !== id));
    },

    itemPacked(id) {
      setAppState((state) => {
        const newState = [...state];
        const i = state.findIndex((item) => item.id == id);
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
      <PackingList
        itemsData={appState}
        removeItem={ctrl.removeItem}
        itemPacked={ctrl.itemPacked}
        sortItems={ctrl.sortItems}
        removeAllItems={ctrl.removeAllItems}
      />
      <Stats itemsData={appState} />
    </div>
  );
}

export default App;
