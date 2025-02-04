import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius, color, padding } from "@mui/system";
import styled from "styled-components";
import { localDate } from "../../Utils/ConvertIsoDate";
import { SimpleTable } from "../Tables/SimpleTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "rgb(231, 122, 20)",
  //   border: '1px solid #fff',
  borderRadius: "20px",
  p: "5px",
  boxShadow: "rgba(151, 65, 252, 0.2) 0 15px 30px -5px",
  //   backgroundImage:' linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)'
};
const style2 = {
  background:
    " linear-gradient(135deg,rgb(14, 32, 13) 0%,rgb(58, 138, 69) 43%,rgb(14, 36, 20) 100%)",
  borderRadius: "17px",
  width: "100%",
  height: "100%",
  color: "#fff",
  padding: 5,
};

export default function ModalDicountDetail({ open, handleClose, data }) {
  const {
    code,
    description,
    expiration_date,
    fixed_amount,
    for_all_products,
    is_active,
    maxUses,
    max_cart_amount,
    min_cart_amount,
    name,
    percent,
    products,
    start_date,
    type_discount,
    unlimited,
  } = data;

  const DISCOUNT_TYPES = [
    { value: "free_shipping", label: "Envío gratis" },
    { value: "first_buy", label: "Primera compra" },
    { value: "for_creators", label: "Creadores" },
    { value: "is_amount", label: "Monto de descuento" },
    { value: "is_percent", label: "Porcentaje" },
  ];

  const SpanEstilizado = styled.span`
    position: absolute;
    overflow: hidden;
    width: 150px;
    height: 150px;
    top: -10px;
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "${percent
        ? `${percent} % de descuento`
        : fixed_amount
          ? `$${fixed_amount} de descuento`
          : `Envio Gratis`}";
      position: absolute;
      width: 150%;
      height: 50px;
      background-image: linear-gradient(
        45deg,
        #ff6547 0%,
        #ffb144 51%,
        #ff7053 100%
      );
      transform: rotate(-45deg) translateY(-20px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.1em;

      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
    }

    &::after {
      content: "";
      position: absolute;
      width: 10px;
      bottom: 0;
      left: 0;
      height: 10px;
      z-index: -1;
      box-shadow: 140px -140px #cc3f47;
      background-image: linear-gradient(
        45deg,
        #ff512f 0%,
        #f09819 51%,
        #ff512f 100%
      );
    }
  `;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-detail"
        aria-describedby="modal-modal-detail"
      >
        <Box sx={style}>
          <Box sx={style2}>
            <SpanEstilizado />
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
             <strong>Nombre:</strong>  {name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <strong>Descripción:</strong>  {description} <br />
              <strong>{`Tipo de descuento: ${
                DISCOUNT_TYPES.find((item) => item.value === type_discount)
                  ?.label || "Desconocido"
              }`}</strong>
              <br />
              <strong>Codigo :</strong>  {code} <br />
              <strong>Fecha de inicio:</strong>  {localDate(start_date)} <br />
              <strong> Fecha de expiracion: </strong>  {localDate(expiration_date)} <br />
              <strong>Monto minimo de compra:</strong> ${min_cart_amount} <br />
              <strong>Monto máximo de compra :</strong> ${max_cart_amount} <br />
              <strong>Usos :</strong>  {unlimited === true ? "Ilimitado" : maxUses} <br />
              <strong>Estado :</strong>  {is_active ? "Activo" : "Desactivado"} <br />
              <strong>Productos participantes:</strong>{" "}
              {for_all_products === true ? (
                "para todos los productos"
              ) : (
                <SimpleTable products={products} />
              )}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
