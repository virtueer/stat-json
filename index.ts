import { analyze } from "permcon";

export interface Stat {
  name: string;
  size: number;
  blocks: number;
  ioBlocks: number;
  type: string;
  device: string;
  inode: number;
  links: number;
  permission: ReturnType<typeof analyze>;
  uid: string;
  gid: string;
  access: number;
  modify: number;
  change: number;
}

export function parse(output: string) {
  const lines = output.trim().split(/\r?\n/);

  const items: Stat[] = [];
  let item: Stat = {} as Stat;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("File:")) {
      if (i !== 0) {
        items.push(item);
        item = {} as Stat;
      }

      const parts = line.split(/\s+/);
      const name = parts[1];

      item.name = name;
    }

    // Size: 4096      	Blocks: 8          IO Block: 4096   directory
    if (line.startsWith("Size: ")) {
      const parts = line.split(/\s+/);
      item.size = +parts[1];
      item.blocks = +parts[3];
      item.ioBlocks = +parts[6];
      item.type = parts.slice(7).join(" ");
    }

    // Device: 840h/2112d	Inode: 9240        Links: 2
    if (line.startsWith("Device: ")) {
      const parts = line.split(/\s+/);
      item.device = parts[1];
      item.inode = +parts[3];
      item.links = +parts[5];
    }

    // Access: (0755/drwxr-xr-x)  Uid: ( 1000/     unx)   Gid: ( 1000/     unx)
    if (line.startsWith("Access: (")) {
      const [, permission_str, uid_str, gid_str] = line.match(
        /Access: (.*) Uid: (.*) Gid: (.*)$/
      )!;

      item.permission = analyze(
        permission_str.trim().split("/")[1].slice(0, -1)
      );
      item.uid = uid_str.replace(/\s/g, "");
      item.gid = gid_str.replace(/\s/g, "");
      continue;
    }

    // Access: 2024-05-03 16:16:18.637028239 +0300
    if (line.startsWith("Access: ")) {
      const date_str = line.replace("Access: ", "");
      item.access = new Date(date_str).getTime();
    }

    // Modify: 2024-05-03 16:12:13.445830272 +0300
    if (line.startsWith("Modify: ")) {
      const date_str = line.replace("Modify: ", "");
      item.modify = new Date(date_str).getTime();
    }

    // Change: 2024-05-03 16:12:13.445830272 +0300
    if (line.startsWith("Change: ")) {
      const date_str = line.replace("Change: ", "");
      item.change = new Date(date_str).getTime();
    }
  }
  items.push(item);

  return items;
}
