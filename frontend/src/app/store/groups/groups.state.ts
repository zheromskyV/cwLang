import { Groups } from 'src/app/models/group';

export interface GroupsState {
  groups: Groups;
}

export const initialGroupsState: GroupsState = {
  groups: [],
};
