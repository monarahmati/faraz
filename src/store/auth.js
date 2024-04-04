import { create } from "zustand";

const useModalStore = create((set) => ({
  modalOpen: false,
  selectedRowId: null,
  setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
  setSelectedRowId: (id) => set({ selectedRowId: id }),
}));

export default useModalStore;
