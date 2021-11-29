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
  const newList: List = list,
    [file, folder] = findFileFromFolder(newList, source);

  if (!file || !folder) {
    throw new Error('file or folder undefined');
  }

  if (file.id === destination) {
    throw new Error('You cannot specify a file as the destination');
  }
  return newList;
}

function findFileFromFolder(list: List, source: string): [IFile, IFolder] | [undefined, undefined] {
  var file: IFile | undefined;

  for (let folder of list) {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    file = searchFileFromFolderFiles(folder.files, source);

    if (!file) {
      continue;
    }

    return [file, folder];
  }

  return [undefined, undefined];
}

function searchFileFromFolderFiles(files: Array<IFile>, source: string): IFile | undefined {
  return files.find((file: IFile) => file.id === source);
}
