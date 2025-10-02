export type Id = string;

export type File = {
  id: Id;
  name: string;
};

export type Folder = {
  id: Id;
  name: string;
  files: File[];
};

export type List = Folder[];

export type FileInfo = { folder: Folder; fileIndex: number };

export type FolderIdMap = Map<Id, Folder>;

export type FileIdMap = Map<Id, FileInfo>;
