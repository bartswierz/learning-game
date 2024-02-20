import { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import {  PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { generateAdditionProblemsForPDF } from "../../utils/index";

//TODO - add a button to generate a pdf of the take home problems, currently there is an issue with the View PDF and exiting the pdf causing a new pdf to be generated. Set it to a generate button, and keep the view pdf button separate
const PDFWorksheetGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [problemsArray, setProblemsArray] = useState<string[]>([]);
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
    problems: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      flexDirection: "row",
      rowGap: "5rem",
    },
    problem: {
      width: "33%",
      paddingVertical: "15px",
    },
  });

  // 45 is the max to fit on the page(3 per row, 15 rows)

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreatePdf = () => {
    console.log("Creating pdf...");
    const problemsArray = generateAdditionProblemsForPDF(45, { min: 10, max: 20 }, { min: 10, max: 20 });
    setProblemsArray(problemsArray);
    setIsPdfCreated(true);
    // GeneratePdf(problemsArray);
  };

  //Reference for creating a pdf - https://react-pdf.org/repl
  const GeneratePdf = () => {
    return (
      <Document style={styles.document}>
        <Page size="A4" style={styles.body}>
          <Text style={styles.title}>Take Home Problems</Text>
          <View style={styles.section}>
            <View style={styles.problems}>
              {problemsArray.map((problem, index) => (
                <Text key={index} style={styles.problem}>
                  {problem}
                </Text>
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

  // CREATES A PDF ON CLICK
  const CreatePdfButton = () => {
    const buttonText = isPdfCreated ? "Create New PDF" : "Create PDF";

    return (
      <button
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-xl px-4 py-2 h-max m-2"
        onClick={handleCreatePdf}
      >
        {buttonText}
      </button>
    );
  };

  const ViewPdfButton = () => {
    return (
      <button
        onClick={handleOpen}
        className={`${
          isPdfCreated ? "bg-blue-500 hover:bg-blue-600" : "disabled:cursor-not-allowed disabled:bg-gray-500"
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

  return (
    <div className="h-[90vh] relative">
      {/* BACKGROUND - USER CLICK WILL CLOSE THE MODAL */}
      <ModalBackground />
      <PDFView />

      <div className="flex flex-col items-center justify-start mt-4 h-full">
        <h1 className="text-2xl underline underline-offset-[5px] text-center">Generate Take Home Problems</h1>
        <div>
          <CreatePdfButton />
          <ViewPdfButton />
        </div>
      </div>
    </div>
  );
};

export default PDFWorksheetGenerator;

{
  /* <div>
  <PDFDownloadLink document={<TakeHomeProblems />} fileName="PracticeProblems.pdf">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Download</button>
  </PDFDownloadLink>
</div> */
}
