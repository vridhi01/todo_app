import { db } from '../firebase_config';
import Firebase from 'firebase';
const initialState = {
    list : []
}

function todoReducers(state=initialState,action) {
    
    switch (action.type)
    {
        case "ADD_TODO" :
            const {data} = action.payload;
            console.log(data);
            if(data.length > 2)
            {
                    return {
                        ...state,//initialstate
                        list:[ //updatestate
                            
                                db.collection("todos").add(
                                    {
                                      inprogress:true,
                                      timestamp:Firebase.firestore.FieldValue.serverTimestamp(),
                                      todo:data
                                    })

                            
                        ]
                    }
              
            }
            case "DELETE_TODO" :
                const {id} = action.payload;
                return {
                    ...state,
                    list:db.collection("todos").doc(id).delete()
                }

                case "EDIT_TODO" :
                    const {editdata,isEditItem} = action.payload;
                    return {
                        ...state,
                        list:db.collection("todos").doc(isEditItem).update({
                            todo:editdata
                           })
                    }
    

        default:return state;
    }
}

export default todoReducers
