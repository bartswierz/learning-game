// TODO - move to separate file
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/shadcn/select";

type ProblemDetails = {
  numberOneMinimum: string;
  numberOneMaximum: string;
  numberTwoMinimum: string;
  numberTwoMaximum: string;
  problemType: string;
};

interface ProblemsFormProps {
  handleFormData: (problemDetails: ProblemDetails) => void;
}

const ProblemsForm = ({ handleFormData }: ProblemsFormProps) => {
  //TODO - this will become the submit button for a form to generate the pdf, we will collect the TYPE of operation, numberOne Range, numberTwo Range. We will then pass those values to the generator

  // CREATES A PDF ON CLICK
  const CreatePdfButton = () => {
    // const buttonText = isPdfCreated ? "Create New PDF" : "Create PDF";
    // const buttonText = isPdfCreated ? "Create New PDF" : "Create PDF";

    return (
      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-xl px-4 py-2 h-max m-2"
        // onClick={handleCreatePdf}
        type="submit"
      >
        Generate Worksheet
      </button>
    );
  };

  //TODO - add a button for generating the pdf type - pass in the operationType to the generator
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("select:", e.target[5].value);
    // console.log(e.target);

    const formData = new FormData(e.target);
    console.log("new form data:", formData);

    const numberOneMinimum = formData.get("number-one-minimum");
    const numberOneMaximum = formData.get("number-one-maximum");
    const numberTwoMinimum = formData.get("number-two-minimum");
    const numberTwoMaximum = formData.get("number-two-maximum");
    // const problemType = formData.get("operation-type");
    const problemType = e.target[5].value;

    console.log("numberOneMinimum:", numberOneMinimum);
    console.log("numberOneMaximum:", numberOneMaximum);
    console.log("numberTwoMinimum:", numberTwoMinimum);
    console.log("numberTwoMaximum:", numberTwoMaximum);
    console.log("problemType:", problemType);

    const problemDetails = {
      numberOneMinimum,
      numberOneMaximum,
      numberTwoMinimum,
      numberTwoMaximum,
      problemType,
    };

    handleFormData(problemDetails);
  };

  // TODO - input our form values into the generateProblemsForPDF function
  // console.log("Creating pdf...");
  // const problemsArray = generateProblemsForPDF(45, { min: 10, max: 20 }, { min: 10, max: 20 });
  // setProblemsArray(problemsArray);
  // setIsPdfCreated(true);
  // GeneratePdf(problemsArray);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <p>Number One Ranges (1-50)</p>
      {/* NUMBER TWO MINIMUM VALUE */}
      <label htmlFor="number-one-minimum" className="">
        Minimum Value:
      </label>
      <input
        type="number"
        id="number-one-minimum"
        name="number-one-minimum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder="Enter a minimum value"
        min="1"
        max="50"
        required
      />

      {/* NUMBER ONE MAXIMUM VALUE */}
      <label htmlFor="number-one-maximum" className="">
        Maximum Value:
      </label>
      <input
        type="number"
        id="number-one-maximum"
        name="number-one-maximum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder="Enter a maximum value"
        min="1"
        max="50"
        required
      />

      {/* NUMBER TWO MININUM VALUE */}
      <p className="mt-4">Number Two Ranges (1-50)</p>
      <label htmlFor="number-two-minimum" className="">
        Minimum Value:
      </label>
      <input
        type="number"
        id="number-two-minimum"
        name="number-two-minimum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder="Enter a minimum value"
        min="1"
        max="50"
        required
      />

      {/* NUMBER TWO MAXIMUM VALUE */}
      <label htmlFor="number-two-maximum" className="">
        Maximum Value:
      </label>
      <input
        type="number"
        id="number-two-maximum"
        name="number-two-maximum"
        className="p-2 m-2 block w-full text-gray-800"
        placeholder="Enter a maximum value"
        min="1"
        max="50"
        required
      />

      {/* OPERATION TYPE */}
      <label htmlFor="operation-type" className="">
        Problem Type:
      </label>
      <Select>
        <SelectTrigger className="w-[160px] text-gray-900" name="operation-type">
          <SelectValue placeholder="Select Problem Type" className="" />
        </SelectTrigger>

        <SelectContent className="">
          <SelectGroup className="">
            {/* <SelectLabel>Problem Types</SelectLabel>
                <SelectSeparator className="bg-gray-300" /> */}

            <SelectItem value="ADDITION" className="text-gray-900 cursor-pointer">
              Addition
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="SUBTRACTION" className="text-gray-900 cursor-pointer">
              Subtraction
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="MULTIPLICATION" className="text-gray-900 cursor-pointer">
              Multiplication
            </SelectItem>
            <SelectSeparator className="bg-gray-300" />

            <SelectItem value="DIVISION" className="text-gray-900 cursor-pointer">
              Division
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <CreatePdfButton />
    </form>
  );
};

export default ProblemsForm;
