export type TInfoBlockProps = {
  title: string,
  icon: any,
  className?: EInfoBlockType
};

export enum EInfoBlockType {
  incognito = 'incognito',
  deadline = 'deadline',
  fine = 'fine'
}

