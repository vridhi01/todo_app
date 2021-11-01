export const addTodo = (data) => {
      return {
          type : 'ADD_TODO',
          payload :{
              data : data
          } 
      }
};
export const editTodoButton = (data,isEditItem) => {
    return {
        type : 'EDIT_TODO',
        payload : {
            editdata :data,
            isEditItem:isEditItem,
        }
        
    }
};
export const deleteTodo = (id) => {
      return {
          type : 'DELETE_TODO',
          payload : {
              id : id
          }
      }
};

