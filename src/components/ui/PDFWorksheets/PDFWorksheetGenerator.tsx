import { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import {  PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { generateProblems } from "../../../utils/index";
import ProblemsForm from "./ProblemsForm";
import { ProblemDetails } from "@/types/types";

interface ProblemsArray {
  num1: number;
  num2: number;
  operationIcon: JSX.Element;
}

// Creates a set of ~48 problems using the user's preferred values and problem type. Once generated, pdf will be available for viewing to print or download.
const PDFWorksheetGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [problemsArray, setProblemsArray] = useState<string[]>([]);
  const [problemsArray, setProblemsArray] = useState<ProblemsArray[]>([]);
  const [isPdfCreated, setIsPdfCreated] = useState(false);

  // Create styles
  const styles = StyleSheet.create({
    document: {
      width: "100vw",
      height: "100%",
    },
    body: {
      width: "800px",
      height: "800px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      color: "#333333",
    },
    text: {
      textColor: "#333333",
      color: "#333333",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginTop: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    allProblemsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      flexDirection: "row",
      rowGap: "5rem",
    },
    problem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "30%",
      padding: "13px",
    },
    number: {
      textAlign: "center",
    },
    equals: {
      textAlign: "center",
    },
    underline: {
      textAlign: "center",
    },
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  //Reference for creating a pdf - https://react-pdf.org/repl
  const GeneratePdf = () => {
    return (
      <Document style={styles.document}>
        <Page size="A4" style={styles.body}>
          <Text style={styles.title}>Take Home Problems</Text>
          <View style={styles.section}>
            {/* PROBLEMS CONTAINER */}
            <View style={styles.allProblemsContainer}>
              {problemsArray.map(({ num1, num2, operationIcon }, index) => (
                // INDIVIDIAL PROBLEMS
                // <div key={index}>
                <View style={styles.problem} key={index}>
                  {/* // <div className="bb flexx" key={index}> */}
                  {/* Number One */}
                  <Text style={styles.number}>{num1}</Text>

                  {/* OPERATION TYPES (add, sub, mult., div.)*/}
                  {operationIcon}

                  {/* Number Two */}
                  <Text style={styles.number}>{num2}</Text>
                  <Text style={styles.equals}>=</Text>
                  <Text style={styles.underline}>______</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  // DISPLAYS OUR PDF IF IT HAS BEEN CREATED
  const PDFView = () => {
    if (!isOpen || !problemsArray || !isPdfCreated) return null;

    return (
      <div className="flex justify-center pt-2">
        <PDFViewer style={{ width: "70%", maxHeight: "100vh", height: "100%", zIndex: 900, top: 0, position: "absolute" }}>
          <GeneratePdf />
        </PDFViewer>
      </div>
    );
  };

  const ViewPdfButton = () => {
    return (
      <button
        onClick={handleOpen}
        className={`${
          isPdfCreated
            ? "bg-blue-500 hover:bg-blue-600"
            : "disabled:cursor-not-allowed disabled:bg-gray-500/30 disablied:text-gray-500/30"
        } h-max px-4 py-2 m-2 transition-all duration-300 text-xl`}
        disabled={!isPdfCreated}
      >
        View Pdf
      </button>
    );
  };

  // BLACK BACKGROUND DISPLAY WHEN MODAL IS OPEN
  const ModalBackground = () => {
    if (!isOpen) return null;

    return <div onClick={handleClose} className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[1]"></div>;
  };

  // Data passed from the ProblemsForm
  const handleFormData = (formData: ProblemDetails) => {
    // console.log("Form data passed: ", formData);
    const { numberOneMinimum, numberOneMaximum, numberTwoMinimum, numberTwoMaximum, problemType } = formData;

    // Creates an array of problems based on the user's input
    const createdProblemsArray = generateProblems(
      48,
      { min: numberOneMinimum, max: numberOneMaximum },
      { min: numberTwoMinimum, max: numberTwoMaximum },
      problemType
    );

    setProblemsArray(createdProblemsArray);
    GeneratePdf();
    setIsPdfCreated(true);
  };

  return (
    <div className="h-[90vh] relative">
      {/* BACKGROUND - USER CLICK WILL CLOSE THE MODAL */}
      <ModalBackground />
      <PDFView />

      <div className="flex flex-col items-center justify-start mt-8">
        <h1 className="text-2xl underline underline-offset-[5px] text-center">Generate Take Home Problems</h1>
        {/* The form should return back the user config choices */}
        <ProblemsForm handleFormData={handleFormData} />

        <div>
          <ViewPdfButton />
        </div>
      </div>
    </div>
  );
};

export default PDFWorksheetGenerator;

{
  /* DOWNLOAD PDF LINK
  <div>
  <PDFDownloadLink document={<TakeHomeProblems />} fileName="PracticeProblems.pdf">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Download</button>
  </PDFDownloadLink>
</div> */
}
