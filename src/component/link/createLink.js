import React from "react";
import { FirebaseContext } from "../../firebase";
import UseFormValidation from "../auth/useFormValidation";
import ValidateCreateLink from "../auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isSubmitting,
    errors,
  } = UseFormValidation(INITIAL_STATE, ValidateCreateLink, handleCreateLink);

  function handleCreateLink() {
    // console.log('link created')
    if (!user) {
      props.history.push("/login");
    } else {
      const { description, url } = values;
      const newLink = {
        description,
        url,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        className={errors.description && "error-input"}
        value={values.description}
        name="description"
        type="text"
        onChange={handleChange}
        placeholder="input description"
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        className={errors.url && "error-input"}
        value={values.url}
        name="url"
        type="text"
        onChange={handleChange}
        placeholder="input url"
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button">submit</button>
    </form>
  );
}

export default CreateLink;
