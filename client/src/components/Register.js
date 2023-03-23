import React from 'react';


const appStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    marginTop: '150px',
    padding: '25px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '600px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '25px',
    gridRowGap: '10px',
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

const Field = React.forwardRef(({ label, type }, ref) => {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input ref={ref} type={type} style={inputStyle} />
        </div>
    );
}
);

const RegistrationForm = ({ onSubmit }) => {
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const emailRef = React.useRef();
    const birthDateRef = React.useRef();
    const passwordRef = React.useRef();
    const confirmRef = React.useRef();
    const locationRef = React.useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            birthday: birthDateRef.current.value,
            password: passwordRef.current.value,
            // confirmPassword: confirmRef.current.value,
            location: locationRef.current.value
        };
        const response = await fetch('http://localhost:3004/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            window.location.href = "/login"
        } else {
            console.error(response.statusText);
        }
        onSubmit(data)
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h1 style={{ marginTop: '5px' }}>Register</h1>
            <Field ref={locationRef} label="Location:" type="text" />
            <Field ref={firstNameRef} label="First Name:" type="text" />
            <Field ref={lastNameRef} label="Last Name:" type="text" />
            <Field ref={emailRef} label="Email:" type="text" />
            <Field ref={passwordRef} label="Password:" type="password" />
            <Field ref={birthDateRef} label="Birthdate:" type="date" />
            <Field ref={confirmRef} label="Confirm Password:" type="password" />
            <div>
                <button style={submitStyle} type="submit" onClick={handleSubmit}>
                    Register
                </button>
            </div>
            <div style={{ marginTop: '10px' }}>
                Already a Member?{' '}
                <a href="/login">Login here</a>.
            </div>
        </form>
    );
};

const RegisterSubmit = () => {
    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };
    return (
        <div style={appStyle}>
            <RegistrationForm onSubmit={handleSubmit} />
        </div>
    );
};

export default RegisterSubmit;
