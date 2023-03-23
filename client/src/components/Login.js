import React from 'react';
// import ReactDOM from 'react-dom';


const appStyle = {
	height: '250px',
  	display: 'flex'
};

const formStyle = {
    margin: 'auto',
    marginTop: '200px',
    padding: '20px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '350px',
  	display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#8d88ea',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({label, type}, ref) => {
  return (
    <div>
      <label style={labelStyle} >{label}</label>
      <input ref={ref} type={type} style={inputStyle} />
    </div>
  );
});

const Form = ({onSubmit}) => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
          email: emailRef.current.value,
          password: passwordRef.current.value
      };
      const response = await fetch('http://localhost:3004/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const json = await response.json();
        console.log(json);
        window.location.href = "/about-us";
    } else {
        console.error(response.statusText);
    }
      onSubmit(data);
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <h1 style={{marginTop: '5px'}}>Login</h1>
      <Field ref={emailRef} label="Email:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit" onClick={handleSubmit}>Login</button>
      </div>
      <div style={{ marginTop: '10px' }}>
        Not a Member?{' '}
        <a href="/register">Register here</a>.
      </div>
    </form>
  );
};

// Usage example:

const LoginSubmit = () => {
  const handleSubmit = data => {
      const json = JSON.stringify(data, null, 4);
      console.clear();
      console.log(json);
  };
  return (
    <div style={appStyle}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginSubmit;
