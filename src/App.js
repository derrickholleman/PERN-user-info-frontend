import './App.css';
import ListUsers from './Components/ListUsers';
import NewUserForm from './Components/NewUserForm'

function App() {
  return (
    <div className="App">
      <h1>Sign Up Form</h1>

      <div className='form-container'>
        <NewUserForm />
      </div>

      <ListUsers />
    </div>
  );
}

export default App;
