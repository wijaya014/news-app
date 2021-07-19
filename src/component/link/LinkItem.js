import React from 'react'
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
        </div>
    )
}

export default LinkItem