import React from 'react'

function Login({ onSubmitHandler, buttonText }) {
  const initialState = {
    email: 'janet.weaver@reqres.in',
    password: 'rootroot3',
    isSubmitting: false,
    hasError: false
  };

  const [loginData, setLoginData] = React.useState(initialState);

  function handleChange(event) {
    const value = event.target.value;
    setLoginData({
      ...loginData,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = loginData;
    return onSubmitHandler({ email, password });
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          aria-describedby="emailHelp"
        />
        <small
          id="emailHelp"
          className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleSubmit}>
        {buttonText}
      </button>
    </form>
  )
}

export default Login
