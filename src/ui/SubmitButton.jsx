import { useFormStatus } from "react-dom";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

const SubmitButton = ({ children, className, ...rest }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      disabled={pending}
      className={`flex justify-center items-center gap-x-4 py-4 w-full ${className}`}
    >
      {children}
      {pending && <SpinnerMini />}
    </Button>
  );
};

export default SubmitButton;
