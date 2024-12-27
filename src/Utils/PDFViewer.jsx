
import { PDFViewer } from '@react-pdf/renderer';


const PdfPreview = ({ file }) => {

  
  return (
    <div>
      {file && (
        <PDFViewer
        showToolbar={true}
        children={ <iframe src={file}  width="800" height="600" />}
        >
        
        </PDFViewer>
      )}
    </div>
  );
};

export default PdfPreview;
