import './App.css';
import Header from './components/include/header';
import Navbar from './components/include/navbar';
import Content from './components/include/content';


function App() {
  return (
    <div >
      <Header />
      <div className="container-fluid">
        <div className="row">
          {/* <Navbar />
          <Content /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
