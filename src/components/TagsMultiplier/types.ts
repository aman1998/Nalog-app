
export type TagsMultiplierProps = {
  name: string;
  setName: (val: string) => void;
  tags: { name: string }[];
  options: { name: string }[];
  fieldName: string;
  disabled?: boolean;
}