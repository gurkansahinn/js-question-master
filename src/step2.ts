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
  let expectedFile: IFile;

  list.forEach((folder: IFolder) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    folder.files.forEach((file: IFile, index: number) => {
      if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === source) {
        expectedFile = file;
        folder.files.splice(index, 1);
      }
    });

    if (folder.id == destination) {
      folder.files.push(expectedFile);
    }
  });
  return list;
}
