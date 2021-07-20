import React from 'react'
import firebase from '../../firebase';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';

function LinkDetail(props){
    const { user, firebase } = React.useContext(FirebaseContext);
    const [commentText, setCommentText] = React.useState('');
    const [links, setLinks] = React.useState(null);
    const linkId = props.match.params.linkId;
    const linkRef = firebase.db.collection('links').doc(linkId)

    React.useEffect(() => {
        getLinks()
    },[])

    function getLinks(){
        linkRef.get().then(doc =>{
            setLinks({...doc.data(), id: doc.id})
        })
    }

    function handleAddComments(){
        if(!user){
            props.history.push('/login')
        }else{
            linkRef.get().then(doc =>{
                if(doc.exists){
                    const prevComments = doc.data().comments;
                    const comments = {
                        postBy : {user: user.uid, name: user.displayName},
                        created : Date.now(),
                        text: commentText
                      }
                    const updateComments = [...prevComments, comments];
                    linkRef.update({comments: updateComments});
                    setLinks(prevState =>({
                        ...prevState,
                        commets: updateComments
                    }    
                    ))
                }
            })
        }

    }

    return !links ? (
        <div>Loading . . .</div>
    ):(
        <div>
            <LinkItem shoCount={false} link={links} />
            <textarea
                name='comment'
                value={commentText}
                handleChange={event =>setCommentText(event.target.value)}
                cols='60'
                row='6'
            />
            <div>
                <button onClick={handleAddComments}>Add comment</button>
            </div>
            {links.comments.map((comment, index)=>(
                <div key={index}>
                    <p className='comment-author'>{comment.postedBy.name}|{comment.created}</p>
                    <p>{comment.text}</p>
                </div>
            )
            )}
        </div>
    )
}

export default LinkDetail;