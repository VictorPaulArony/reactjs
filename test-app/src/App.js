//import styling fot the react application 
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PostForm from './components/PostForm';
import Card from './components/Card';


//default function of the app page(landing page of the application)
function App() {
  return (
    <div className = "App">
      <Navbar />
      <div className='container'>
        <Sidebar />
        <main className='content'>
          <PostForm />
          <div className='card-container'>
            <Card title="Post 1" description="This is the first post." />
            <Card title="Post 2" description="This is the second post." />
            <Card title="Post 3" description="This is the third post." />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
