
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Interest = {
  id: string;
  name: string;
  icon?: string;
};

interface InterestsState {
  selectedInterests: Interest[];
  hasSelectedInterests: boolean;
  interests: Interest[];
  addInterest: (interest: Interest) => void;
  removeInterest: (interestId: string) => void;
  setHasSelectedInterests: (value: boolean) => void;
}

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set) => ({
      selectedInterests: [],
      hasSelectedInterests: false,
      interests: [
        { id: '1', name: 'Startups' },
        { id: '2', name: 'Technology' },
        { id: '3', name: 'Fundraising' },
        { id: '4', name: 'Growth' },
        { id: '5', name: 'Product' },
        { id: '6', name: 'AI' },
        { id: '7', name: 'Marketing' },
        { id: '8', name: 'Design' },
        { id: '9', name: 'Engineering' },
      ],
      addInterest: (interest) =>
        set((state) => ({
          selectedInterests: [...state.selectedInterests, interest],
        })),
      removeInterest: (interestId) =>
        set((state) => ({
          selectedInterests: state.selectedInterests.filter(
            (interest) => interest.id !== interestId
          ),
        })),
      setHasSelectedInterests: (value) =>
        set(() => ({
          hasSelectedInterests: value,
        })),
    }),
    {
      name: 'interests-storage',
    }
  )
);
