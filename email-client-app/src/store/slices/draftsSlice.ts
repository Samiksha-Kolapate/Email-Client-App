
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Draft {
  id: string;
  subject: string;
  recipients: string;
  body: string;
  status: string; // "Draft" or "Sent"
}

interface DraftState {
  drafts: Draft[];
}

const initialState: DraftState = {
  drafts: [],
};

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload);
    },
   
    updateDraft: (state, action: PayloadAction<Draft>) => {
      const index = state.drafts.findIndex(draft => draft.id === action.payload.id);
      if (index !== -1) {
        state.drafts[index] = action.payload;
      }
    },
    setDrafts: (state, action: PayloadAction<Draft[]>) => {
      state.drafts = action.payload;
    }
  },
});

export const { addDraft, updateDraft,setDrafts } = draftsSlice.actions;
export default draftsSlice.reducer;

