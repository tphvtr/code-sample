export interface LogParams {
    action: 0 | 1;
    type: 'VOTE' | 'FAV';
    img_id: string;
    user_action: 0 | 1;
}

export interface Log {
  action: string;
  category: string;
  id: string;
  time: string;
  user_action: 0 | 1;
}

