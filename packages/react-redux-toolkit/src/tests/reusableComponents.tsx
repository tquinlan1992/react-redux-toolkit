const Input: React.FC<{ placeholder: string; value: string; onChange: (value: string) => void }> = (
  props,
) => <input {...props} onChange={(event) => props.onChange(event.target.value)} />;

const Button: React.FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

export const Components = {
  Button,
  Input,
};
