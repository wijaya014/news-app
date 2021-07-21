import React from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordAndEmail, setResetPasswordAndEmail] = React.useState("");
  const [isReset, setIsReset] = React.useState(false);
  const [resetPasswordError, setResetPasswordError] = React.useState(null);

  async function handleForgotPassword() {
    try {
      await firebase.resetPassword(resetPasswordAndEmail);
      setIsReset(true);
      setResetPasswordError(null);
      setResetPasswordAndEmail("");
    } catch (err) {
      setIsReset(false);
      setResetPasswordAndEmail(err.message);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="input email address"
        className="input"
        onChange={(event) => setResetPasswordAndEmail(event.target.value)}
      />
      <div>
        <button onClick={handleForgotPassword} className="button">
          send
        </button>
      </div>
      {isReset && <p>Please check your email</p>}
      {resetPasswordError && <p className="error-text">{resetPasswordError}</p>}
    </div>
  );
}

export default ForgotPassword;
