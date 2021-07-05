//# DEPENDENCYS
import { Schema, model } from "mongoose";

const Operator = new Schema(
  {
    razon_social: {
      type: String,
    },
    ruc: {
      type: Number,
      unique: true,
    },
    nombre_comercial: {
      type: String,
    },
    direccion: {
      type: String,
    },
    departamento: {
      type: String,
    },
    provincia: {
      type: String,
    },
    distrito: {
      type: String,
    },
    telefono_1: {
      type: String,
    },
    telefono_2: {
      type: String,
    },
    email: {
      type: String,
    },
    web: {
      type: String,
    },
    grupo: {
      type: String,
    },
    clase: {
      type: String,
    },
    tipo: {
      type: String,
    },
    categoria: {
      type: String,
    },
    especialidad: {
      type: String,
    },
    nro_certificado: {
      type: String,
    },
    fecha_expedicion: {
      type: String,
    },
    fecha_expiracion: {
      type: String,
    },
    representante_legal: {
      type: String,
    },
    idioma: {
      type: String,
    },
    centro_formacion: {
      type: String,
    },
    tripadvisor: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Operator", Operator);
