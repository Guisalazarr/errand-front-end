export interface Errand {
  id: string;
  title: string;
  description: string;
  status: ErrandStatus;
}

export enum ErrandStatus {
  unarchived = 'U',
  archived = 'A'
}

export interface ListErrandProps {
  id: string;
  status?: ErrandStatus;
}

export interface SearchErrandProps {
  id: string;
  title?: string;
}

export interface CreateErrandProps {
  id: string;
  title: string;
  description: string;
}

export interface DeleteErrandProps {
  id: string;
  errandId: string;
}

export interface UpdateErrandProps {
  id: string;
  errandId: string;
  title?: string;
  description?: string;
  status?: ErrandStatus;
}
