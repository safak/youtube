import { useState } from 'react';
import './app.css';
import FormInput from './components/FormInput';
import inputs from './utils/inputs';

function App() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="app">
      <section>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {inputs(formData).map((input) => {
            return <FormInput handleChange={handleChange} key={input.id} {...input} value={formData[input.name]} />
          })}
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}

export default App;
