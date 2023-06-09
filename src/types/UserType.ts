import ErrandType from './ErrandType';

type UserType = {
  name: string;
  email: string;
  password: string;
  errands: ErrandType[];
};

export default UserType;
