export interface UserBoxProps extends Pick<Auth, 'user'> {
  currentUser: Auth | null;
  online: boolean;
}
