import type { Id, List } from './types';
import { buildMaps, rebuildList, getValidatedData } from './move.utils';

export default function move(list: List, sourceFileId: Id, destinationFolderId: Id): List {
  const { fileIdMap, folderIdMap } = buildMaps(list);

  const { sourceFile, sourceFolder, destinationFolder } = getValidatedData({
    fileIdMap,
    folderIdMap,
    sourceFileId,
    destinationFolderId,
  });

  return rebuildList({
    list,
    sourceFolderId: sourceFolder.id,
    destinationFolderId,
    updatedSourceFiles: sourceFolder.files.filter((file) => file.id !== sourceFileId),
    updatedDestinationFiles: [...destinationFolder.files, sourceFile],
  });
}
