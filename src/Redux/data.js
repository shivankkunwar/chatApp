import { createSlice, configureStore } from '@reduxjs/toolkit'
import rooms from "../data/rooms"
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    room: rooms
  },
  reducers: {
        updateData:(state,action)=>{
            const { roomId ,...message}=action.payload;
            let i=0;
           for(  i=0;i<state.room.length;i++){
                if(state.room[i].id===roomId){
                        break;
                }
           }
           state.room[i].data.messages.push(message);
        
           
        }
  }
})

export const { updateData } = counterSlice.actions
export default counterSlice.reducer;
