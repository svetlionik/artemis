import { createSelector } from 'reselect';

import { IRequirement } from 'shared/types';

import { RootState } from 'store/store';

const selectTechState = (state: RootState) => {
  return state.tech;
};

export const completedTechSelector = createSelector(
  [selectTechState],
  (state) =>
    state.techRequirements.find(
      (requirement: IRequirement) =>
        requirement.type === 'PRACTICAL' && requirement.status === 'SUBMITTED',
    ),
);

export const inProgressTechSelector = createSelector(
  [selectTechState],
  (state) =>
    state.techRequirements.find(
      (requirement: IRequirement) =>
        requirement.type === 'PRACTICAL' &&
        requirement.status === 'IN_PROGRESS',
    ),
);

export const notStartedTechSelector = createSelector(
  [selectTechState],
  (state) =>
    state.techRequirements.find(
      (requirement: IRequirement) =>
        requirement.type === 'PRACTICAL' &&
        requirement.status === 'NOT_STARTED',
    ),
);
