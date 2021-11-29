// Please update this type as same as with the data shape.

interface IFolder {
  id: string | number;
  name: string;
  files: Array<IFile>;
}

interface IFile {
  id: string | number;
  name: string;
}

type List = Array<IFolder>;

export default function move(list: List, source: string, destination: string): List {
  let expectedFile: IFile | null = null;
  let foldersMapWithId: Map<string | number, IFolder> = new Map<string | number, IFolder>();

  list.forEach((folder: IFolder) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    let [files, poppedFile] = poppedFilesFromFolder(folder, source);
    if (poppedFile) {
      if (expectedFile) {
        throw new Error(`There are multiple source files: ${source}`);
      }

      expectedFile = poppedFile;
    }

    foldersMapWithId.set(folder.id, {
      id: folder.id,
      name: folder.name,
      files: files,
    });
  });

  if (!expectedFile) {
    throw new Error(`File not found: ${source}`);
  }

  const destinationFolder = foldersMapWithId.get(destination);

  if (!destinationFolder || destinationFolder.id === source) {
    throw new Error('You cannot specify a file as the destination');
  }

  destinationFolder.files.push(expectedFile);

  return Array.from(foldersMapWithId.values());
}

function poppedFilesFromFolder(folder: IFolder, fileId: string): [Array<IFile>, IFile | null] {
  let poppedFile: IFile | null = null;
  let files = new Array<IFile>();

  folder.files.forEach((file: IFile) => {
    if (file.id === fileId) {
      poppedFile = file;
      return;
    }

    files.push(file);
  });

  return [files, poppedFile];
}
