import {
  AlertDialog as AlertDialog_,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../shadcn/alert-dialog";

interface AlertDialogProps {
  title: string;
  description: string;
}
// TODO - update text
const AlertDialog = ({ title, description }: AlertDialogProps) => {
  return (
    <AlertDialog_>
      <AlertDialogTrigger asChild>
        <button className="bg-blue-500 py-2 px-4">Show Dialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-blue-500">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog_>
  );
};

export default AlertDialog;
