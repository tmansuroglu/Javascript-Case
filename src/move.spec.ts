import move from './move';
import type { List } from './types';

describe('move', () => {
  it('moves given file to another folder', () => {
    const list: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '4', name: 'File 3' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [{ id: '7', name: 'File 5' }],
      },
    ];

    const original = JSON.parse(JSON.stringify(list)) as List;

    const result = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [
          { id: '7', name: 'File 5' },
          { id: '4', name: 'File 3' },
        ],
      },
    ];

    expect(move(list, '4', '6')).toStrictEqual(result);
    expect(list).toStrictEqual(original);
  });

  it('throws error if given source is not a file', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [] },
    ];

    expect(() => move(list, '3', '1')).toThrow('You cannot move a folder');
  });

  it('throws error if given destination is not a folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [{ id: '4', name: 'File 2' }] },
    ];

    expect(() => move(list, '2', '4')).toThrow('You cannot specify a file as the destination');
  });

  it('throws error if source file is not found', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
    ];

    expect(() => move(list, '999', '1')).toThrow('Source file not found');
  });

  it('throws error if destination folder is not found', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
    ];

    expect(() => move(list, '2', '999')).toThrow('Destination folder not found');
  });

  it('throws error if moving file within the same folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
    ];

    expect(() => move(list, '2', '1')).toThrow('You cannot move within the same folder');
  });

  it('moves the only file in a folder to another folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      {
        id: '3',
        name: 'Folder 2',
        files: [{ id: '4', name: 'File 2' }],
      },
    ];

    const original = JSON.parse(JSON.stringify(list)) as List;

    const result = [
      {
        id: '1',
        name: 'Folder 1',
        files: [],
      },
      {
        id: '3',
        name: 'Folder 2',
        files: [
          { id: '4', name: 'File 2' },
          { id: '2', name: 'File 1' },
        ],
      },
    ];

    expect(move(list, '2', '3')).toStrictEqual(result);

    expect(list).toStrictEqual(original);
  });

  it('moves a file to an empty folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
        ],
      },
      {
        id: '4',
        name: 'Folder 2',
        files: [],
      },
    ];

    const original = JSON.parse(JSON.stringify(list)) as List;

    const result = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      {
        id: '4',
        name: 'Folder 2',
        files: [{ id: '3', name: 'File 2' }],
      },
    ];

    expect(move(list, '3', '4')).toStrictEqual(result);

    expect(list).toStrictEqual(original);
  });

  it('throws error for empty list when source and destination not found', () => {
    const list: List = [];

    expect(() => move(list, '1', '2')).toThrow('Source file not found');
  });
});
