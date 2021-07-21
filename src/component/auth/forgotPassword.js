import React from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { user, firebase } = React.useContext(FirebaseContext);
  const [resetPasswordAndEmail, setResetPasswordAndEmail] = React.useState("");
  const [isReset, setIsReset] = React.useState(false);
  const [resetPasswordError, setResetPasswordError] = React.useState(null);

  async function handleForgotPassword() {
    try {
      await firebase.resetPasswordAndEmail(resetPasswordAndEmail);
      setIsReset(true);
      setResetPasswordError(null);
    } catch (err) {
      setIsReset(false);
      setResetPasswordAndEmail(err.message);
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={(event) => setResetPasswordAndEmail(event.target.value)}
      />
      <div>
        <button onClick={handleForgotPassword} className="button">
          send
        </button>
      </div>
      {isReset && <p>Please check yoour email</p>}
      {resetPasswordAndEmail && (
        <p className="error-text">{resetPasswordAndEmail}</p>
      )}
    </div>
  );
}

export default ForgotPassword;
