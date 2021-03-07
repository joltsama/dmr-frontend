import React, {useState} from "react";
import Appbar from "../components/Appbar";
import Container from "@material-ui/core/Container";
import MedicalRecordCard from "../components/MedicalRecordCard";
import { handleRead } from "../services/contractCalls";
import { Button } from "@material-ui/core";

var CryptoJS = require("crypto-js");

function View(props) {
  
  const [photo, setPhoto] = useState("");

  const getData = async () => {
    const accountsAvailable = await window.ethereum.request({ method: 'eth_accounts' });
    const address = details.scAccountAddress;
    handleRead(accountsAvailable[0], address)
      .then((response) => {
        console.log("response", response);

        const url = 'https://ipfs.infura.io/ipfs/'+response;
        fetch(url)
          .then(res => res.text())
          .then(res2 => {
            var bytes = CryptoJS.AES.decrypt(res2, "password");
            setPhoto(bytes.toString(CryptoJS.enc.Utf8))
          })
      })
  };
  
  console.log(props);
  const patientID = props.history.location.patientID;
  const details = props.history.location.data;
  // TODO: check for viewing permission, other navigate away
  // TODO: navigate away when patientID is not set
  const showTitle = "Viewing Patient: " + patientID;
  return (
    <>
      <Appbar showTitle={showTitle} />
      <Container maxWidth="md" style={{ marginTop: "68px" }}>
        {
          photo==="" ?
          <Button
            color="primary"
            onClick={getData}
            className="upbutton"
          >
            View Files
          </Button>
          :
          <img src={photo} />
        }
        {/* <MedicalRecordCard />
        <MedicalRecordCard />
        <MedicalRecordCard /> */}
      </Container>
    </>
  );
}

export default View;
