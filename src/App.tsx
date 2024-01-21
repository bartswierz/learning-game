import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Addition from "./components/ui/Addition";
import Operation from "./components/ui/Operation";
import { Settings } from "./types/index.ts";
import GenerateProblemsPdf from "./components/ui/GenerateProblemsPdf";
import GeneratePdf from "./components/ui/GeneratePdf";
import { BlobProvider, PDFViewer, usePDF } from "@react-pdf/renderer";
import { render } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
// import SampleComponent from "./components/ui/sampleTests/SampleComponent.tsx";
// import RestartGameBtn from "./components/ui/RestartGameBtn.tsx";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
function App() {
  // Settings will be the default settings upon starting the app.
  const settings: Settings = {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  };

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <Navbar />
      {/* MAIN CONTENT */}
      {/* <Addition settings={settings} /> */}
      {/* <Operation settings={settings} operationType={"ADDITION"} /> */}
      {/* <div className="flex w-full b h-[50vh] items-center justify-center"> */}
      {/* <PDFViewer> */}
      {/* <GeneratePdf /> */}
      {/* </PDFViewer> */}
      {/* </div> */}
      {/* ReactPDF.render( */}
      <div className="b flex justify-center items-center text-gray-700X">
        <GeneratePdf />
      </div>
      {/* ); */}
      <div>
        <PDFDownloadLink document={<GeneratePdf />} fileName="PracticeProblems.pdf">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Download</button>
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;
