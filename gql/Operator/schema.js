//# DEPENDENCYS
import { gql } from "apollo-server";

export default gql`
  #ESQUEMA OPERADORE
  type Operator {
    _id: ID,
    razon_social: String,
    ruc:Int,
    nombre_comercial:String,
    direccion:String,
    departamento:String,
    provincia:String,
    distrito:String,
    telefono_1:String,
    telefono_2:String,
    email:String,
    web:String,
    grupo:String,
    clase:String,
    tipo:String,
    categoria:String,
    especialidad:String,
    nro_certificado:String,
    fecha_expedicion:String,
    representante_legal:String,
    idioma:String,
    centro_formacion:String,
  }

  type Respond {
    data: Operator,
    status: Int,
    message: String
  }

  #QUERY OPERADORES
  extend type Query{
    getOperator(web:String):Operator!
  }

  # MUTATIONS => OPERDORES
  extend type Mutation {
    getOperator(web:String):Respond!
    uploadData: Boolean,
    scrpinTripadvisor: Boolean,
    urlTripAdvisor: Boolean
  }
`;
