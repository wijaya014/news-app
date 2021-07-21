import React from "react";
import UseFormValidation from "./useFormValidation";
import firebase from "../../firebase";
import validateLogin from "./validate";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isSubmitting,
    errors,
  } = UseFormValidation(INITIAL_STATE, validateLogin, authenticUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/");
    } catch (err) {
      console.log("Authentic user error", err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            type="teks"
            name="name"
            value={values.name}
            placeholder="username"
            autoComplete="off"
            onChange={handleChange}
          />
        )}

        <input
          type="teks"
          name="email"
          value={values.email}
          placeholder="email"
          autoComplete="on"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex-mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need an account" : "already have a account"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">forgot password ?</Link>
      </div>
    </div>
  );
}

export default Login;
