import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from './LinkItem';

const LINKS_PER_PAGE = 5;


function LinkList(props) {
  const{firebase}=React.useContext(FirebaseContext);
  const[links, setLinks]=React.useState([]);
  const[cursor, setCursor] = React.useState(null);
  const[loading, setLoading] = React.useState(false);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = Number(props.match.params.page);
  const linksRef = firebase.db.collection('links');

  const pageIndex = page ? (page -1)*LINKS_PER_PAGE+1 : 0;

  React.useEffect(() =>{
    const unsubcribe = getLinks();
    return () => unsubcribe();
  },[isTopPage, page])

  function getLinks(){
    setLoading(true)
    const hasCursor = Boolean(cursor)
    if(isTopPage){
      return linksRef
      .orderBy('voteCount','desc')
      .limit(LINKS_PER_PAGE)
      .onSnapshot(handleSnapshot);
    }else if(page === 1){
      return linksRef
        .orderBy('created','desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }else if(hasCursor){
      return linksRef
        .orderBy('created','desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
  }

  function handleSnapshot(snapshot){
    const links = snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    })
    const lastLink = links[links.length-1]
    setLinks(links);
    setCursor(lastLink);
    setLoading(false);
  }

  function visitPreviousPage(){
    if(page > 1){
      props.history.push(`/new/${page-1}`)
    }
  }

  function visitNextPage(){
    if(page <= links.length /LINKS_PER_PAGE){
      props.history.push(`/new/${page + 1}`);
    }
  }

  return (
    <div style={{ opacity : loading ? 0.25 : 1 }}>
      {links.map((link, index) =>(
        <LinkItem  key={link.id} showCount={true} link={link} index={index + pageIndex}/>
       )
      )}
      {isNewPage && (
        <div className='pagination'>
          <div className='pointer mr2' onClick={visitPreviousPage}>Previous</div>
          <div className='pointer' onClick={visitNextPage}>Next</div>
        </div>
      )}
    </div>
  )
}

export default LinkList;
