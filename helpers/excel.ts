import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TDocXLS } from "@/interfaces";

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

export const exportToExcelCustom = (
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
