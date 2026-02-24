import { Checkbox } from "./ui/checkbox";

export interface FilterCheckBoxProps {
  className?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  text: string;
  value: string;
  name?: string;
}

export const FilterCheckBox: React.FC<FilterCheckBoxProps> = (props) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={`checkbox-${String(props.value)}-${String(props.name)}`}
        checked={props.checked}
        onCheckedChange={props.onChange}
      />
      <label htmlFor={`checkbox-${String(props.value)}-${String(props.name)}`}>{props.text}</label>
    </div>
  );
};
