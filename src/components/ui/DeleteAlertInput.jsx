import React, { useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import { green } from "@mui/material/colors";
import withReactContent from "sweetalert2-react-content";

const DeleteAlertInput = ({ title, callbackToDeleteItem, disabled, value }) => {
  const [inputValue, setInputValue] = useState("");
  const showSwal = () => {
    withReactContent(Swal).fire({
      title: title,
      input: "text",
      inputPlaceholder: "Escribe el nombre de la sucursal",
      inputValue,
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: green[700],
      preConfirm: () => {
        const input = Swal.getInput().value;
        if (input === value) {
          callbackToDeleteItem();
        } else {
          Swal.fire("No se elimino", "", "error");
        }
      },
    }).then(() => {
      setInputValue("");
    });
  };
  //   const ModalSweet = () => {
  //     Swal.fire({
  //       title: title,
  //       showDenyButton: true,
  //       denyButtonText: "Cancelar",
  //       confirmButtonText: "Eliminar",
  //       confirmButtonColor: green[700],
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         callbackToDeleteItem();
  //       } else if (result.isDenied) {
  //         Swal.fire("No se elimino", "", "error");
  //       }
  //     });
  //   };

  return (
    <>
      <GridActionsCellItem
        color="warning"
        onClick={() => showSwal()}
        icon={<Delete />}
        disabled={disabled === true ? disabled : false}
      ></GridActionsCellItem>
    </>
  );
};

export default DeleteAlertInput;
