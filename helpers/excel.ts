import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TDocXLS } from "@/interfaces";
import moment from "moment";
import toast from "react-hot-toast";

export const exportToExcel = <T extends object>(data: T[], name: string) => {
  // Define los encabezados manualmente

  const header = Object.keys(data[0]).map((key) => key);

  // Convierte el array de objetos a una hoja de cálculo
  const ws = XLSX.utils.json_to_sheet(data, { header });

  //   const ws = XLSX.utils.json_to_sheet(data); // Convierte el array de objetos en una hoja de cálculo
  const wb = XLSX.utils.book_new(); // Crea un nuevo libro de Excel
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Agrega la hoja al libro

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" }); // Escribe el archivo
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Convierte el buffer a Blob
  saveAs(blob, `${name}.xlsx`); // Guarda el archivo usando file-saver
};

export const exportToExcelCustom2 = (
  data: TDocXLS[],
  name: string = "exported_data.xlsx"
) => {
  const workbook = XLSX.utils.book_new();

  data.forEach((obj) => {
    // Define los encabezados manualmente
    const header = Object.keys(obj["dataSheet"][0]).map((key) => key);

    // Convertir el array de la propiedad 'items' en una hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(obj.dataSheet);

    // Agregar la hoja al libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, obj.nameSheet);
  });

  // Exportar el libro a un archivo Excel

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Escribe el archivo
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Convierte el buffer a Blob
  saveAs(blob, `${name}`); // Guarda el archivo usando file-saver
  // XLSX.writeFile(workbook, name);
};

// export const exportToExcelCustom = (
//   data: TDocXLS[],
//   name: string = "exported_data.xlsx"
// ) => {
//   const workbook = XLSX.utils.book_new();

//   // Mapa para agrupar la información por 'descripcion'
//   let resumenMap: { [key: string]: any } = {};
//   let resumenHeaders: string[] = [];

//   // Iterar sobre los datos para preparar el resumen
//   data.forEach((obj) => {
//     let head = obj["dataSheet"][0];
//     if (!head) return;

//     // Obtener los encabezados de la hoja actual
//     const header = Object?.keys(obj["dataSheet"][0]);

//     // Guardar los encabezados para el resumen (solo la primera vez)
//     if (resumenHeaders.length === 0) {
//       resumenHeaders = [...header];
//     }

//     // Agrupar por la columna 'descripcion' y sumar 'importe'
//     obj.dataSheet.forEach((row: any) => {
//       const descripcionValue = row["descripcion"]; // Asumimos que 'descripcion' es el nombre de la columna
//       const importeValue = row["importe"];

//       // Si no existe en el mapa el valor de 'descripcion', se inicializa
//       if (!resumenMap[descripcionValue]) {
//         resumenMap[descripcionValue] = { ...row, importe: 0 }; // Inicializar importe a 0
//       }

//       // Sumar el valor de 'importe' si es numérico
//       if (!isNaN(importeValue)) {
//         resumenMap[descripcionValue]["importe"] += parseFloat(importeValue);
//       }
//     });
//   });

//   // Convertir el mapa de resumen en un array para crear la hoja de resumen
//   const resumenData = Object.values(resumenMap);

//   // Crear la hoja de resumen con los mismos encabezados
//   const resumenSheet = XLSX.utils.json_to_sheet(resumenData, {
//     header: resumenHeaders,
//   });

//   // Agregar la hoja de resumen como la primera hoja
//   XLSX.utils.book_append_sheet(workbook, resumenSheet, "Resumen");

//   // Ahora agregar las demás hojas
//   data.forEach((obj) => {
//     const worksheet = XLSX.utils.json_to_sheet(obj.dataSheet);
//     XLSX.utils.book_append_sheet(workbook, worksheet, obj.nameSheet);
//   });

//   // Exportar el libro a un archivo Excel
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(blob, `${name}`);
// };

// export const exportToExcelCustom = (
//   data: TDocXLS[],
//   name: string = "exported_data.xlsx"
// ) => {
//   const workbook = XLSX.utils.book_new();

//   // Mapa para agrupar la información por 'descripcion'
//   let resumenMap: { [key: string]: any } = {};
//   let resumenHeaders: string[] = [];

//   // Iterar sobre los datos para preparar el resumen
//   data.forEach((obj) => {
//     let head = obj["dataSheet"][0];
//     if (!head) return;

//     // Obtener los encabezados de la hoja actual
//     const header = Object?.keys(head);

//     // Guardar los encabezados para el resumen (solo la primera vez)
//     if (resumenHeaders.length === 0) {
//       resumenHeaders = [...header];
//     }

//     // Agrupar por la columna 'descripcion' y sumar 'importe'
//     obj.dataSheet.forEach((row: any) => {
//       const descripcionValue = row["descripcion"]; // Asumimos que 'descripcion' es el nombre de la columna
//       const importeValue = row["importe"];

//       // Si no existe en el mapa el valor de 'descripcion', se inicializa
//       if (!resumenMap[descripcionValue]) {
//         resumenMap[descripcionValue] = { ...row, importe: 0 }; // Inicializar importe a 0
//       }

//       // Sumar el valor de 'importe' si es numérico
//       if (!isNaN(importeValue)) {
//         resumenMap[descripcionValue]["importe"] += parseFloat(importeValue);
//       }
//     });
//   });

//   // Convertir el mapa de resumen en un array para crear la hoja de resumen
//   const resumenData = Object.values(resumenMap);

//   // Crear la hoja de resumen con los mismos encabezados
//   const resumenSheet = XLSX.utils.json_to_sheet(resumenData, {
//     header: resumenHeaders,
//   });

//   // Agregar la hoja de resumen como la primera hoja
//   XLSX.utils.book_append_sheet(workbook, resumenSheet, "Resumen");

//   // Ahora agregar las demás hojas
//   data.forEach((obj) => {
//     const worksheet = XLSX.utils.json_to_sheet(obj.dataSheet);

//     // Asignar nombre dinámico según 'poliza'
//     let sheetName = "Desconocido";

//     let polizaValue = (obj.dataSheet[0] as any)?.poliza; // Suponiendo que 'poliza' es consistente en cada hoja
//     let date = (obj.dataSheet[0] as any)?.createAt as Date; // Suponiendo que 'poliza' es consistente en cada hoja

//     if (polizaValue === "V") {
//       sheetName = "Ventas";
//     } else if (polizaValue === "L") {
//       sheetName = "Cobranza";
//     } else if (polizaValue === "C") {
//       sheetName = "Canceladas";
//     }

//     sheetName = sheetName + " " + moment(date).format("YYYY-MM-DD");

//     XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//   });

//   // Exportar el libro a un archivo Excel
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(blob, `${name}`);
// };

export const exportToExcelCustom = (
  data: TDocXLS[],
  name: string = "exported_data.xlsx"
) => {
  const workbook = XLSX.utils.book_new();

  // Mapa para agrupar la información por 'descripcion'
  let resumenMap: { [key: string]: any } = {};
  let resumenHeaders: string[] = [];

  // Iterar sobre los datos para preparar el resumen
  data.forEach((obj) => {
    let head = obj["dataSheet"][0];
    if (!head) return;

    // Obtener los encabezados de la hoja actual
    const header = Object?.keys(head);

    // Guardar los encabezados para el resumen (solo la primera vez)
    if (resumenHeaders.length === 0) {
      resumenHeaders = [...header];
    }

    obj.dataSheet.forEach((row: any) => {
      const descripcionValue = row["descripcion"]; // Asumimos que 'descripcion' es el nombre de la columna
      const importeValue = parseFloat(row["importe"]); // Limpia el importe y lo convierte a número

      // Inicializar entradas en el mapa si no existen
      const positiveKey = `${descripcionValue} Positivos`;
      const negativeKey = `${descripcionValue} Negativos`;

      if (descripcionValue === "CFDI Cancelados Gas") {
        if (importeValue > 0) {
          // Procesar positivos
          if (!resumenMap[positiveKey]) {
            resumenMap[positiveKey] = {
              ...row,
              descripcion: positiveKey,
              importe: 0,
            }; // Cambia la descripción
          }
          resumenMap[positiveKey]["importe"] += importeValue;
        } else if (importeValue < 0) {
          // Procesar negativos
          if (!resumenMap[negativeKey]) {
            resumenMap[negativeKey] = {
              ...row,
              descripcion: negativeKey,
              importe: 0,
            }; // Cambia la descripción
          }
          resumenMap[negativeKey]["importe"] += importeValue;
        }
      } else {
        // Caso general para otras descripciones
        if (!resumenMap[descripcionValue]) {
          resumenMap[descripcionValue] = { ...row, importe: 0 }; // Inicializar importe a 0
        }
        if (!isNaN(importeValue)) {
          resumenMap[descripcionValue]["importe"] += importeValue;
        }
      }
    });
  });

  // Convertir el mapa de resumen en un array para crear la hoja de resumen
  const resumenData = Object.values(resumenMap);

  // Crear la hoja de resumen con los mismos encabezados
  const resumenSheet = XLSX.utils.json_to_sheet(resumenData, {
    header: resumenHeaders,
  });

  // Agregar la hoja de resumen como la primera hoja
  XLSX.utils.book_append_sheet(workbook, resumenSheet, "Resumen");

  console.log(data);
  // Ahora agregar las demás hojas
  data.forEach((obj, i) => {
    const worksheet = XLSX.utils.json_to_sheet(obj.dataSheet);

    // Asignar nombre dinámico según 'poliza'
    let sheetName = "Desconocido";

    let polizaValue = (obj.dataSheet[0] as any)?.poliza; // Suponiendo que 'poliza' es consistente en cada hoja
    let date = (obj.dataSheet[0] as any)?.createAt as Date; // Suponiendo que 'poliza' es consistente en cada hoja

    if (polizaValue === "V") {
      sheetName = "Ventas";
    } else if (polizaValue === "L") {
      sheetName = "Cobranza";
    } else if (polizaValue === "C") {
      sheetName = "Canceladas";
    }

    if (!polizaValue || !date)
      return toast.error(`La poliza ${obj?.nameSheet} no esta completa.`); //Como un continue;

    sheetName = sheetName + " " + moment(date).format("YYYY-MM-DD");

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Exportar el libro a un archivo Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${name}`);
};
