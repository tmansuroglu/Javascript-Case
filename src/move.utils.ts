import type { File, FileIdMap, FileInfo, Folder, FolderIdMap, Id, List } from './types';

type BuildMapsReturnType = {
  folderIdMap: FolderIdMap;
  fileIdMap: FileIdMap;
};

export const buildMaps = (list: List): BuildMapsReturnType => {
  const folderIdMap = new Map<Id, Folder>();
  const fileIdMap = new Map<Id, FileInfo>();

  list.forEach((folder) => {
    folderIdMap.set(folder.id, folder);

    folder.files.forEach((file, fileIndex) => {
      fileIdMap.set(file.id, { folder, fileIndex });
    });
  });

  return { folderIdMap, fileIdMap };
};

type GetValidatedDataParams = {
  folderIdMap: FolderIdMap;
  fileIdMap: FileIdMap;
  sourceFileId: Id;
  destinationFolderId: Id;
};

type GetValidatedDataReturnType = {
  sourceFile: File;
  sourceFolder: Folder;
  destinationFolder: Folder;
};

export const getValidatedData = ({
  folderIdMap,
  fileIdMap,
  sourceFileId,
  destinationFolderId,
}: GetValidatedDataParams): GetValidatedDataReturnType => {
  if (folderIdMap.has(sourceFileId)) {
    throw new Error('You cannot move a folder');
  }

  if (fileIdMap.has(destinationFolderId)) {
    throw new Error('You cannot specify a file as the destination');
  }

  const sourceFileInfo = fileIdMap.get(sourceFileId);

  const destinationFolder = folderIdMap.get(destinationFolderId);

  if (!sourceFileInfo) {
    throw new Error('Source file not found');
  }

  if (!destinationFolder) {
    throw new Error('Destination folder not found');
  }

  if (sourceFileInfo.folder.id === destinationFolderId) {
    throw new Error('You cannot move within the same folder');
  }

  return {
    sourceFile: sourceFileInfo.folder.files[sourceFileInfo.fileIndex],
    sourceFolder: sourceFileInfo.folder,
    destinationFolder,
  };
};

type RebuildListParams = {
  list: List;
  sourceFolderId: Id;
  destinationFolderId: Id;
  updatedSourceFiles: File[];
  updatedDestinationFiles: File[];
};

export const rebuildList = ({
  list,
  sourceFolderId,
  destinationFolderId,
  updatedDestinationFiles,
  updatedSourceFiles,
}: RebuildListParams): List =>
  list.map((folder) => {
    if (folder.id === sourceFolderId) {
      return { ...folder, files: updatedSourceFiles };
    }

    if (folder.id === destinationFolderId) {
      return { ...folder, files: updatedDestinationFiles };
    }

    return folder;
  });
