export interface IFILE {
    name: string;
    content?: string;
    type: ("file" | "directory" | "symlink");
    group: string;
    owner: string;
    size: number;
    permissions: string;
    links: number;
    modifiedAt: Date;
}
