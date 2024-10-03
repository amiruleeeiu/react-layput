export interface TestButtonProps {
  placeholder: string;
}

const TestButton: React.FC<TestButtonProps> = ({ placeholder }) => {
  return <div>{placeholder}</div>;
};

export default TestButton;
