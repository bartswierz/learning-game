import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/shadcn/select";
import { OperationType, ProblemDetails } from "@/types/types";
import { useTranslation } from "react-i18next";

interface ProblemsFormProps {
  handleFormData: (problemDetails: ProblemDetails) => void;
}

const ProblemsForm = ({ handleFormData }: ProblemsFormProps) => {
  const { t } = useTranslation();

  // CREATES A PDF ON CLICK
  const SubmitButton = () => {
    return (
      <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-xl px-4 py-2 h-max m-2" type="submit">
        {t("Generate Worksheet")}
      </button>
    );
  };

  // On submit, will send the data to the PDFWorksheetGenerator file
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Get the form data
    const numberOneMinimum = formData.get("number-one-minimum") as string;
    const numberOneMaximum = formData.get("number-one-maximum") as string;
    const numberTwoMinimum = formData.get("number-two-minimum") as string;
    const numberTwoMaximum = formData.get("number-two-maximum") as string;
    const problemType: OperationType = e.target[5].value;

    const problemDetails: ProblemDetails = {
      numberOneMinimum,
      numberOneMaximum,
      numberTwoMinimum,
      numberTwoMaximum,
      problemType,
    };

    if (problemDetails) handleFormData(problemDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mt-2">{t("Number One Ranges (1-50)")}</p>
      {/* NUMBER TWO MINIMUM VALUE */}
      <label htmlFor="number-one-minimum" className="">
        {t("Minimum Value:")}
      </label>
      <input
        type="number"
        id="number-one-minimum"
        name="number-one-minimum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder={t("Enter a minimum value")}
        min="1"
        max="50"
        required
      />

      {/* NUMBER ONE MAXIMUM VALUE */}
      <label htmlFor="number-one-maximum" className="">
        {t("Maximum Value:")}
      </label>
      <input
        type="number"
        id="number-one-maximum"
        name="number-one-maximum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder={t("Enter a maximum value")}
        min="1"
        max="50"
        required
      />

      {/* NUMBER TWO MININUM VALUE */}
      <p className="mt-4">{t("Number Two Ranges (1-50)")}</p>
      <label htmlFor="number-two-minimum" className="">
        {t("Minimum Value:")}
      </label>
      <input
        type="number"
        id="number-two-minimum"
        name="number-two-minimum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder={t("Enter a minimum value")}
        min="1"
        max="50"
        required
      />

      {/* NUMBER TWO MAXIMUM VALUE */}
      <label htmlFor="number-two-maximum" className="">
        {t("Maximum Value:")}
      </label>
      <input
        type="number"
        id="number-two-maximum"
        name="number-two-maximum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder={t("Enter a maximum value")}
        min="1"
        max="50"
        required
      />
      <div></div>

      {/* OPERATION TYPE */}
      <div className="mt-4"></div>
      <label htmlFor="operation-type">{t("Problem Type:")}</label>
      <Select required>
        <SelectTrigger className="w-[160px] text-gray-900" name="operation-type">
          <SelectValue placeholder={t("Select Problem Type")} className="" />
        </SelectTrigger>

        <SelectContent className="">
          <SelectGroup className="">
            <SelectItem value="ADDITION" className="text-gray-900 cursor-pointer">
              {t("Addition")}
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="SUBTRACTION" className="text-gray-900 cursor-pointer">
              {t("Subtraction")}
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="MULTIPLICATION" className="text-gray-900 cursor-pointer">
              {t("Multiplication")}
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="DIVISION" className="text-gray-900 cursor-pointer">
              {t("Division")}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="mt-4"></div>
      <SubmitButton />
    </form>
  );
};

export default ProblemsForm;
