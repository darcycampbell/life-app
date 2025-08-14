import { create } from 'zustand';

export const useModalStore = create((set) => ({
  addModalOpen: false,
  editModalOpen: false,
  
  editModalOpened: () => set({ 
    editModalOpen: true, 
    addModalOpen: false 
  }),

  addModalOpened: () => set({ 
    editModalOpen: false, 
    addModalOpen: true 
  })
}));