import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLink() {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [filteredLink, setFilteredLink] = React.useState([]);

  React.useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const link = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(link);
      });
  }
  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLink = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });

    setFilteredLink(matchedLink);
  }

  return (
    <div>
      <div></div>
      <form onSubmit={handleSearch}>
        Search <input onChange={(event) => setFilter(event.target.value)} />
        <button>Ok</button>
      </form>
      {filteredLink.map((filter, index) => (
        <LinkItem
          key={filter.id}
          index={index}
          showCount={false}
          link={filter}
        />
      ))}
    </div>
  );
}

export default SearchLink;
