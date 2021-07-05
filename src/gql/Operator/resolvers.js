//# MODELS
 
import XLSX from "xlsx";
import Operator from "../../models/Operator";
//# Scraping module
import scrapeIt from 'scrape-it'
import cherrio from 'cheerio'

export default {
  Query:{
    getOperator:async (_,{web}) => {
      try {
        // Busqueda en la BD por RUC
        return await Operator.findOne({web});
        
      } catch (error) {
        console.log(error)
        
      }

    }
  }
  ,
  Mutation: {
    uploadData: async (_) => {
      try {
        const datas = XLSX.readFile("data/cusco.xls");
        const datasbook = datas.SheetNames;

        const sheet = datasbook[0];
        const dataExel = XLSX.utils.sheet_to_json(datas.Sheets[sheet]);

        dataExel.map(async (operator) => {
          let region = operator["UBIGEO"].split("/", 3);
          let operatorinput = {
            razon_social: operator["RAZON SOCIAL"],
            ruc: operator["RUC"],
            nombre_comercial: operator["NOMBRE COMERCIAL"],
            direccion: operator["DIRECCION"],
            departamento: region[0],
            provincia: region[1],
            distrito: region[2],
            telefono_1: operator["TELEFONO 1"],
            telefono_2: operator["TELEFONO 2"],
            email: operator["MAIL"],
            web: operator["WEB"],
            grupo: operator["GRUPO"],
            clase: operator["CLASE"],
            tipo: operator["TIPO"],
            categoria: operator["CATEGORIA"],
            especialidad: operator["ESPECIALIDAD"],
            nro_certificado: operator["NRO. CERTIFICADO"],
            fecha_expedicion: operator["FECHA EXPEDICION"],
            fecha_expiracion: operator["FECHA EXPIRACIONL"],
            representante_legal: operator["REPRESENTANTE LEGAL"],
            idioma: operator["IDIOMA"],
            centro_formacion: operator["CENTRO FORMACION"],
          };
          const oper = new Operator(operatorinput);
          await oper.save();
        });
      } catch (error) {
        console.log(error);
      }
    },
    getOperator:async (_,{web}) => {
      console.log(web)
      try {
        // Busqueda en la BD por RUC
        let operator = await Operator.findOne({web});
        if(!operator){
          return{
            status: 404,
            message: "Este sitio web no es Segura"
          }
        }
        console.log(operator)
        return{
          status: 200,
          data: operator,
          message: "Este sitio web es Segura"
        }
      } catch (error) {
        console.log(error)
        return{
          status: 500,
          message: "Ohps al paso "
        }
        
      }

    },
    /* @Author Lizandro Conde Mescco
    Script para sacar las urls de las agencas 
    */
    scrpinTripadvisor: async (_) =>{
      try {
        let operators = await Operator.find()
        operators.map(({web})=>{
          if(web!==""){
           
          scrapeIt(`https://www.google.com/search?q=${web}+tripadvisor`).then(( {body}) => {
            let $ = cherrio.load(body)
            let key = 0;
            $('a').each( async function(){
              
              if(this.attribs.href.indexOf('tripadvisor.com.pe')!= -1){
                
                if(key<=0){
                  await Operator.findOneAndUpdate({web},{tripadvisor:this.attribs.href})
                 
                }
                key =1;
                
              }
            })
            
        })
      }
        })
       
      return true

      } catch (error) {
        console.log(error)
      }
    },
    /* @Author Lizandro Conde Mescco
    Script Para la Limpieza de urls 
    */
    urlTripAdvisor: async (_) =>{
      try {
        let operators = await Operator.find()
        operators.map( async(data)=>{
          if(data.tripadvisor){
             
            if(data.tripadvisor.slice(0,7)== "/url?q="){
              let triparray = data.tripadvisor.split("/url?q=")
              let tripadvisor = triparray[1]
              if(tripadvisor){
                await Operator.findOneAndUpdate({ruc:data.ruc},{tripadvisor})
              }
            }else{
              await Operator.findOneAndUpdate({ruc:data.ruc},{tripadvisor:""})
            }
      }
        })
       
      return true

      } catch (error) {
        console.log(error)
      }
    },
  },
};
