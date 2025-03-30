"use client";
import { useParams } from "next/navigation";

const FacturaPage = () => {
  const params = useParams();
  const { tipo, id } = params;

  return (
    <div>
      <h1>Factura para {tipo}</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default FacturaPage;
