export type LoginBody = {
  userName: string;
  password: string;
};

export type UpdateUserInfoBody = {
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export interface IEvent {
  id: string;
  linkId: string;
  country: string;
  linkCode: string;
  device: string;
  browser: string;
  os: string;
  createdAt: string;
}
export interface ILink {
  id: string;
  code: string;
  url: string;
  projectId: string;
  events: IEvent[];
}
