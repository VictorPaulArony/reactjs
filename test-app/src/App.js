//import styling fot the react application 
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostForm from './components/PostForm';
import Card from './components/Card';
import MessageButton from './components/buttons';
import { CustomButton, handleAlert, handleRedirect, useToggle } from './components/buttons';


//default function of the app page(landing page of the application)
function App() {
  //use of the predifed toggle hook
  const [isToggled, toggle] = useToggle()
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <Sidebar />
        <main className='content'>
          <div className='form-container'>
            <PostForm />
          </div>
          <div className='card-container'>
            <Card title="Post 1" description="This is the first post." />
            <Card title="Post 2" description="This is the second post." />
            <Card title="Post 3" description="This is the third post." />
          </div>
        </main>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Reusable Buttons with Different Functionalities</h1>

        {/* Alert Button */}
        <CustomButton label="Show Alert" onClick={handleAlert} />

        {/* Redirect Button */}
        <CustomButton label="Redirect to Home" onClick={handleRedirect} />

        {/* Toggle Button */}
        <CustomButton label="Toggle State" onClick={toggle} />
        <p>Toggle State: {isToggled ? "ON" : "OFF"}</p>

        {/* Custom Button with Inline Functionality */}
        <CustomButton
          label="Log to Console"
          onClick={() => console.log("Button clicked!")}
        />
      </div>
    </div>
  );
}

export default App;
