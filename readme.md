Parse `stat` command output into JSON

```javascript
const { parse } = require("stat-json");

const output = `  File: .
  Size: 4096      	Blocks: 8          IO Block: 4096   directory
Device: 840h/2112d	Inode: 1403        Links: 14
Access: (0755/drwxr-xr-x)  Uid: ( 1000/     unx)   Gid: ( 1000/     unx)
Access: 2024-06-30 19:52:57.940150636 +0300
Modify: 2024-06-30 19:52:57.930150423 +0300
Change: 2024-06-30 19:52:57.930150423 +0300`;

parse(output);
```

### Returns

```json
{
  "name": ".",
  "size": 4096,
  "blocks": 8,
  "ioBlocks": 4096,
  "type": "directory",
  "device": "840h/2112d",
  "inode": 1403,
  "links": 14,
  "permission": {
    "fileType": "Directory",
    "symbolic": "drwxr-xr-x",
    "octal": "0755",
    "owner": { "read": true, "write": true, "execute": true },
    "group": { "read": true, "write": false, "execute": true },
    "other": { "read": true, "write": false, "execute": true },
    "suid": false,
    "guid": false,
    "sticky_bit": false
  },
  "uid": "(1000/unx)",
  "gid": "(1000/unx)",
  "access": 1719766377940,
  "modify": 1719766377930,
  "change": 1719766377930
}
```

The permission property is the result of the analysis function of the [permcon](https://www.npmjs.com/package/permcon) library.
