import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Skill {
  id: number;
  name: string;
}

interface SkillsState {
  items: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  items: [],
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    fetchSkillsRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      // Временно кидаем action
      console.log(action.payload);
    },
    fetchSkillsSuccess(state, action: PayloadAction<Skill[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchSkillsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSkillsRequest, fetchSkillsSuccess, fetchSkillsFailure } =
  skillsSlice.actions;

export default skillsSlice.reducer;
