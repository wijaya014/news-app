import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const [commentTeks, setCommentTeks] = React.useState("");
  const [link, setLink] = React.useState(null);
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);
  React.useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentTeks,
          };
          const updateComments = [...previousComments, comment];
          linkRef.update({ comments: updateComments });
          setLink((prevState) => ({
            ...prevState,
            comments: updateComments,
          }));
          setCommentTeks("");
        }
      });
    }
  }

  return !link ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea
        onChange={(event) => setCommentTeks(event.target.value)}
        value={commentTeks}
        cols="60"
        rows="6"
      />
      <div>
        <button onClick={handleAddComment}>Add comment</button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} | {comment.created}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
