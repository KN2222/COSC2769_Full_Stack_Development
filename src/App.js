import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <strong>Testing bootstrap</strong>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary">
            Left
          </button>
          <button type="button" class="btn btn-primary">
            Middle
          </button>
          <button type="button" class="btn btn-primary">
            Right
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
