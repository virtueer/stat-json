import { expect, test } from "@jest/globals";
import { parse } from ".";

const output = `  File: .
Size: 4096      	Blocks: 8          IO Block: 4096   directory
Device: 840h/2112d	Inode: 1403        Links: 14
Access: (0755/drwxr-xr-x)  Uid: ( 1000/     unx)   Gid: ( 1000/     unx)
Access: 2024-06-30 19:52:57.940150636 +0300
Modify: 2024-06-30 19:52:57.930150423 +0300
Change: 2024-06-30 19:52:57.930150423 +0300
Birth: -
File: .aws -> /mnt/c/Users/pc/.aws
Size: 20        	Blocks: 0          IO Block: 4096   symbolic link
Device: 840h/2112d	Inode: 43284       Links: 1
Access: (0777/lrwxrwxrwx)  Uid: ( 1000/     unx)   Gid: ( 1000/     unx)
Access: 2024-06-29 21:14:11.280090008 +0300
Modify: 2023-10-26 23:41:42.036148211 +0300
Change: 2023-10-26 23:41:42.036148211 +0300
Birth: -
File: .bash_logout
Size: 220       	Blocks: 8          IO Block: 4096   regular file
Device: 840h/2112d	Inode: 41547       Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/     unx)   Gid: ( 1000/     unx)
Access: 2024-06-30 15:02:48.609589486 +0300
Modify: 2023-10-26 14:20:52.557141136 +0300
Change: 2023-10-26 14:20:52.557141136 +0300
Birth: -`;

const correct = [
  {
    name: ".",
    size: 4096,
    blocks: 8,
    ioBlocks: 4096,
    type: "directory",
    device: "840h/2112d",
    inode: 1403,
    links: 14,
    permission: {
      fileType: "Directory",
      symbolic: "drwxr-xr-x",
      octal: "0755",
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: false, execute: true },
      other: { read: true, write: false, execute: true },
      suid: false,
      guid: false,
      sticky_bit: false,
    },
    uid: "(1000/unx)",
    gid: "(1000/unx)",
    access: 1719766377940,
    modify: 1719766377930,
    change: 1719766377930,
  },
  {
    name: ".aws",
    size: 20,
    blocks: 0,
    ioBlocks: 4096,
    type: "symbolic link",
    device: "840h/2112d",
    inode: 43284,
    links: 1,
    permission: {
      fileType: "Symbolic Link",
      symbolic: "lrwxrwxrwx",
      octal: "0777",
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: true, execute: true },
      other: { read: true, write: true, execute: true },
      suid: false,
      guid: false,
      sticky_bit: false,
    },
    uid: "(1000/unx)",
    gid: "(1000/unx)",
    access: 1719684851280,
    modify: 1698352902036,
    change: 1698352902036,
  },
  {
    name: ".bash_logout",
    size: 220,
    blocks: 8,
    ioBlocks: 4096,
    type: "regular file",
    device: "840h/2112d",
    inode: 41547,
    links: 1,
    permission: {
      fileType: "Regular File",
      symbolic: "-rw-r--r--",
      octal: "0644",
      owner: { read: true, write: true, execute: false },
      group: { read: true, write: false, execute: false },
      other: { read: true, write: false, execute: false },
      suid: false,
      guid: false,
      sticky_bit: false,
    },
    uid: "(1000/unx)",
    gid: "(1000/unx)",
    access: 1719748968609,
    modify: 1698319252557,
    change: 1698319252557,
  },
];

test("should parse correctly", () => {
  const parsed = parse(output);

  expect(correct).toStrictEqual(parsed);
});

test("should throw", () => {
  const parsed = parse(output.replace("-rw-r--r--", "-rw-r--r-x"));

  expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
});
