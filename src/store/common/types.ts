export interface State {
  todoData: TodoProps;
  user: UserProps;
  templates: TemplateProps[];
}

export interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface TemplateProps {
  author: string;
  copiedCount: number;
  coverImg: string;
  createdAt: string;
  desc: string;
  id: number;
  isHot: boolean;
  title: string;
  user: { _id: string; username: string; nickName: string };
  nickName: string;
  username: string;
  _id: string;
}
