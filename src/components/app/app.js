import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchInput: "",
    };

    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.state.data.length + 1,
    };

    const dataForLocalStorage = JSON.stringify([...this.state.data, newItem]);

    localStorage.setItem("FirstProjectData", dataForLocalStorage);
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  editItem = (e, id) => {
    const { data } = this.state;
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          salary: Number(e.target.value.replace("$", "")),
        };
      }
      return item;
    });

    const dataForLocalStorage = JSON.stringify(newData);
    localStorage.setItem("FirstProjectData", dataForLocalStorage);

    this.setState({
      data: newData,
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  findMatches = (wordToMatch, arrayOfWords) =>
    arrayOfWords.filter(({ name }) => {
      const regex = new RegExp(wordToMatch, "gi");
      return name.match(regex);
    });

  onSearchInput = (e) => {
    const { value } = e.target;

    this.setState({ searchInput: value });
    const newData = this.findMatches(value, this.state.data);

    if (newData.length > 0) {
      this.setState({
        newData: newData,
      });
    }
  };

  componentDidMount() {
    const storedData = localStorage.getItem("FirstProjectData");
    if (storedData) {
      this.setState({ data: JSON.parse(storedData) });
    }
  }

  render() {
    const { data, searchInput, newData } = this.state;

    const employees = data.length;
    const increased = data.filter((item) => item.increase).length;
    const dynamicData = searchInput.length === 0 ? data : newData;

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel
            employees={data}
            onSearch={this.onSearch}
            searchInput={searchInput}
            onSearchInput={this.onSearchInput}
          />
          <AppFilter />
        </div>
        <EmployeesList
          editItem={this.editItem}
          data={dynamicData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
