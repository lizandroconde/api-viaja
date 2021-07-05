//# Plugins
import axios from "axios";
//# MODELS
import Operator from "../../../models/Operator";
import Tripadvisor from "../../../models/Operator/Tripadvisor";

//# Scraping module
var TripadvisorLocales = require("tripadvisor-locales").TripadvisorLocales;

export default {
  Mutation: {
    /* @Author Lizandro Conde Mescco
    Script Para la Limpieza de urls 
    */
    getTripAdvisorData: async (_) => {
      try {
        let operators = await Operator.find();
        operators.map(async (data) => {
          if (data.tripadvisor) {
            var config = {
              method: "get",
              url: `https://extranet.bokun.io/activities/editor/633741/tripadvisor-preview?url=${data.tripadvisor}`,
              headers: {
                Cookie:
                  "optimizelyEndUserId=oeu1621866931609r0.9054406909300659; intercom-id-m0rnyex5=fb8940fe-46e3-4452-86aa-1a200a1f5d2a; prism_1000767018=f3967456-a2b4-43e7-b954-4eb193576148; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZ3J1cG9jb25kZXRyYXZlbEBnbWFpbC5jb20iLCJib2t1bi1jb250ZXh0IjoiRVhUUkFORVQiLCJ2ZW5kb3JJZCI6IjEyNTI5IiwiY291bnRlciI6Ijg3Iiwic2FsdCI6IiQyYSQxMCRqbFZ1QjNIZVZiR3RZdFFtc2g4VzNlIn0sImV4cCI6MTYzMDMzNzA2MiwibmJmIjoxNjIyNTYxMDYyLCJpYXQiOjE2MjI1NjEwNjJ9.ZrFmsEOpnwSL7boS-FJ1fOtBSfBIRiWUmxPzEaXqxCU; BokunSocketToken=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZ3J1cG9jb25kZXRyYXZlbEBnbWFpbC5jb20iLCJib2t1bi1jb250ZXh0IjoiRVhUUkFORVQiLCJ2ZW5kb3JJZCI6IjEyNTI5IiwiY291bnRlciI6Ijg3Iiwic2FsdCI6IiQyYSQxMCRqbFZ1QjNIZVZiR3RZdFFtc2g4VzNlIn0sImV4cCI6MTYzMDMzNzA2MiwibmJmIjoxNjIyNTYxMDYyLCJpYXQiOjE2MjI1NjEwNjJ9.ZrFmsEOpnwSL7boS-FJ1fOtBSfBIRiWUmxPzEaXqxCU; intercom-session-m0rnyex5=dkwxTHVRTDVOODRvaEFxa2JyaW5kNnM4bUtPSW5HMmJjMXl5RjNQbEZ4UmRlc2JwL1lpZDRhY1Uwem1OcWxYYy0tK3NweDRBL0Y0MDRyRW1VcEVXdGhZUT09--948bf6c2e8403dc8cdff7a550b4858514d9c3b41; BokunSocketToken=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZ3J1cG9jb25kZXRyYXZlbEBnbWFpbC5jb20iLCJib2t1bi1jb250ZXh0IjoiRVhUUkFORVQiLCJ2ZW5kb3JJZCI6IjEyNTI5IiwiY291bnRlciI6Ijg3Iiwic2FsdCI6IiQyYSQxMCRqbFZ1QjNIZVZiR3RZdFFtc2g4VzNlIn0sImV4cCI6MTYzMDMzNzA2MiwibmJmIjoxNjIyNTYxMDYyLCJpYXQiOjE2MjI1NjEwNjJ9.ZrFmsEOpnwSL7boS-FJ1fOtBSfBIRiWUmxPzEaXqxCU",
              },
            };

            axios(config)
              .then(async function (response) {
                let tripadvisor = new Tripadvisor({
                  ...response.data,
                  operator: data._id,
                });
                let savetrip = await tripadvisor.save();
                console.log(savetrip);
              })
              .catch(function (error) {
                console.log(error);
              });

            // if(data.tripadvisor.slice(0,7)== "/url?q="){
            //   let triparray = data.tripadvisor.split("/url?q=")
            //   let tripadvisor = triparray[1]
            //   if(tripadvisor){
            //     await Operator.findOneAndUpdate({ruc:data.ruc},{tripadvisor})
            //   }
            // }else{
            //   await Operator.findOneAndUpdate({ruc:data.ruc},{tripadvisor:""})
            // }
          }
        });

        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getLocale: async (_) => {
      TripadvisorLocales.bestDomainFor("en_US");
      console.log(
        TripadvisorLocales.bestPageUrlFor({
          locale: "en_US",
          locationId: "13396142",
        })
      );
    },
  },
};
