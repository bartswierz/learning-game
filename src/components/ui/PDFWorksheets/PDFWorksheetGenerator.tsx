import { useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import {  PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { generateProblems } from "../../../utils/index";
import ProblemsForm from "./ProblemsForm";
import { ProblemDetails, THEME } from "@/types/types";
import { useTranslation } from "react-i18next";

// Text-to-Speech Data, Component, and Store for current Language
import { TTS_DATA } from "@/constants/constants";
import useTTSStore from "@/store/tts_store";
import Heading from "../Layout/Heading";
import Button from "../Buttons/Button";

interface ProblemsArray {
  num1: number;
  num2: number;
  operationIcon: JSX.Element;
}

// Creates a set of ~48 problems using the user's preferred values and problem type. Once generated, pdf will be available for viewing to print or download.
const PDFWorksheetGenerator = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [problemsArray, setProblemsArray] = useState<ProblemsArray[]>([]);
  const [isPdfCreated, setIsPdfCreated] = useState(false);

  // Retrieve Language from our store
  const ttsLanguage = useTTSStore((state) => state.language);
  const { TAKE_HOME_WORKSHEETS } = TTS_DATA;
  const ttsDescription = TAKE_HOME_WORKSHEETS.description[ttsLanguage];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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

  //Reference for creating a pdf - https://react-pdf.org/repl
  const GeneratePdf = () => {
    return (
      <Document style={styles.document}>
        <Page size="A4" style={styles.body}>
          <Text style={styles.title}>{t("Take Home Problems")}</Text>
          <View style={styles.section}>
            {/* PROBLEMS CONTAINER */}
            <View style={styles.allProblemsContainer}>
              {problemsArray.map(({ num1, num2, operationIcon }, index) => (
                // INDIVIDIAL PROBLEMS
                <View style={styles.problem} key={index}>
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
        <PDFViewer
          style={{
            width: "70%",
            height: "100vh",
            zIndex: 100,
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
          }}
        >
          <GeneratePdf />
        </PDFViewer>
      </div>
    );
  };

  const ViewPdfButton = () => {
    return (
      <div className="w-[130px]">
        <Button onClick={handleOpen} disabled={!isPdfCreated} variant={THEME}>
          {t("View PDF")}
        </Button>
      </div>
    );
  };

  // Data passed from the ProblemsForm
  const handleFormData = (formData: ProblemDetails) => {
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
    <div className="pb-[56px] relative">
      {/* BACKGROUND - USER CLICK WILL CLOSE THE MODAL */}
      <ModalBackground isOpen={isOpen} handleClose={handleClose} />
      <PDFView />

      <div className="flex flex-col items-center justify-start mt-8">
        <Heading
          text={t("Generate Take Home Problems")}
          voiceText={ttsDescription}
          language={ttsLanguage}
          className="underline underline-offset-[5px] px-4"
        />
        {/* The form should return back the user config choices */}
        <ProblemsForm handleFormData={handleFormData} />

        <ViewPdfButton />
      </div>
    </div>
  );
};

export default PDFWorksheetGenerator;

interface ModalBackgroundProps {
  isOpen: boolean;
  handleClose: () => void;
}
// BLACK BACKGROUND DISPLAY WHEN MODAL IS OPEN
const ModalBackground = ({ isOpen, handleClose }: ModalBackgroundProps) => {
  if (!isOpen) return null;

  return <div onClick={handleClose} className="fixed inset-0 h-[100vh] bg-black/70 z-[100]"></div>;
};
