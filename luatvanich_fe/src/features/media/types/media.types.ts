export interface UploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
  originalName: string;
}

export type MediaFolder =
  | 'general'
  | 'offices'
  | 'lawyers'
  | 'services'
  | 'posts'
  | 'avatars'
  | 'settings';
