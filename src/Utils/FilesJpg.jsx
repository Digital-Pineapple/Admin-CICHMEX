import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { toPng } from "html-to-image";
import Grid from '@mui/material/Grid'
import Image from "mui-image";
import { Button, Typography } from "@mui/material";

const PdfToImage = ({ file }) => {
  const [numPages, setNumPages] = useState(null); // Estado para almacenar el número total de páginas del PDF
  const [pageNumber, setPageNumber] = useState(1); // Estado para almacenar el número de la página actual
  const [pageImages, setPageImages] = useState([]); // Estado para almacenar las imágenes generadas de cada página del PDF

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        // Configuración del worker de pdf.js
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

        // Carga el archivo PDF desde la URL proporcionada
        const response = await fetch(file);
        const pdfData = await response.arrayBuffer();

        // Carga el documento PDF
        const loadingTask = pdfjs.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;

        const images = [];
        for (let i = 0; i < pdf.numPages; i++) {
          // Crea un canvas para renderizar cada página del PDF
          const canvas = document.createElement("canvas");
          const page = await pdf.getPage(i + 1);
          const scale = 0.5; // Escala para ajustar el tamaño de la página

          const viewport = page.getViewport({ scale });
          const canvasContext = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext,
            viewport,
          };

          // Renderiza la página en el canvas
          await page.render(renderContext);

          // Convierte el canvas a una imagen PNG y la agrega al array de imágenes
          const imageDataUrl = await toPng(canvas);
          images.push(imageDataUrl);
        }
        
        setPageImages(images); // Almacena las imágenes generadas en el estado
        setNumPages(pdf.numPages); // Almacena el número total de páginas del PDF
        
      } catch (error) {
        console.log("Error al cargar el PDF:", error);
      }
    };

    fetchPDF(); // Llama a la función para cargar y procesar el PDF
  }, []);

  // Maneja el cambio de página al presionar los botones de navegación
  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  // Se ejecuta cuando el documento PDF se carga correctamente
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
 
  return (
    <>
      {/* Contenedor para mostrar el PDF en su formato original */}
      <Grid
        container
        maxHeight={400}
        justifyContent={'center'}
      >
        <Document file={file} onLoadSuccess={handleDocumentLoadSuccess}>
          <Page scale={0.7} pageNumber={pageNumber} />
        </Document>
      </Grid>

      {/* Contenedor para mostrar las imágenes generadas de cada página */}
      <Grid container>
        {pageImages.map((imageDataUrl, index) => (
          <object
            data={imageDataUrl}
            key={index}
            alt={`Page ${index + 1}`}
          />
        ))}
      </Grid>

      {/* Botones de navegación para cambiar entre páginas */}
      <Grid
        width={'100%'}
        position={'absolute'}
        top={'70%'}
        display='flex'
        justifyContent={'center'}
      >
        <Button
          variant="contained"
          color='primary'
          disabled={pageNumber <= 1}
          onClick={() => handlePageChange(pageNumber - 1)}
          sx={{ mr: 2 }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={pageNumber >= numPages}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Siguiente
        </Button>
      </Grid>
    </>
  );
};

export default PdfToImage;
