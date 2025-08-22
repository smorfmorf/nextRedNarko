import { Checkbox } from "./ui/checkbox";

export interface FilterCheckBoxProps {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  text: string;
  value: string;
}

export const FilterCheckBox: React.FC<FilterCheckBoxProps> = (props) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={props.value}
        checked={props.checked}
        onCheckedChange={props.onChange}
      />
      <label htmlFor={props.value}>{props.text}</label>
    </div>
  );
};
