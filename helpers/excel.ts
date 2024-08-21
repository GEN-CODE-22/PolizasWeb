import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
