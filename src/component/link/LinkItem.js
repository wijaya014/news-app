import React from 'react'
import {Link} from 'react-router-dom'
import { getDomain } from '../../util';
import { FirebaseContext } from '../../firebase'
function LinkItem({link, index, showCount, history}){
    const{ firebase, user } = React.useContext(FirebaseContext);

    function handleVote(){
        if(!user){
            history.push('/login');
        }else{
            const voteRef = firebase.db.collection('links').doc(link.id)
            voteRef.get().then(doc =>{
                if(doc.exists){
                    const previousVote = doc.data().votes;
                    const vote = {voteBy: {id: user.uid, name: user.displayName}};
                    const updatedVote = [...previousVote, vote];
                    const voteCount = updatedVote.length;
                    voteRef.update({votes: updatedVote, voteCount});
                }
            })
        }
    }
    function handleDelete(){
        const linkRef = firebase.db.collection('links').doc(link.id);
        linkRef.delete().then(() =>{
            console.log(`data with id ${link.id} succesfully deleted`);
        }).catch(err =>{
            console.log('error while delete data ', err);
        })
    }

    const postByAuthUser = user && user.uid === link.postedBy.id;

    return(
        <div className='flex-items-start mt2'>
            <div className='flex items-center'>
                {showCount && <span className='grey'>{index}.</span>}
                <div className='voted-button' onClick={handleVote}>Δ</div>
            </div>
            <div className='ml1'>
                <a href={link.url} className='black no-underline'>{link.description}</a>
                <span className='link'>({getDomain(link.url)})</span>
            </div>
            <div className='f6 1h-copy gray'>
                {link.voteCount} votes {link.postedByName} {link.created}
                {'|'}
                <Link to={`/link/${link.id}`}>
                    {
                        link.comments.length > 0 ?
                         `${link.comments.length} comments` : 'discuss'
                    }
                </Link>
                {
                    postByAuthUser && (
                        <>
                          {'|'}
                          <span onClick={handleDelete}>delete</span>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default LinkItem