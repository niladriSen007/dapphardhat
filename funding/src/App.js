import './App.css';
import Greeter from "./artifacts/contracts/Lock.sol/Lock.json";
import {ethers} from "ethers"
import { useEffect, useState } from 'react';

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(()=>{
    const loadProvider = async() =>{
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545"
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      )
      setContract(contract)
      setProvider(provider)

      // console.log(contract)
    }
    loadProvider()
  })

  useEffect(()=>{
    const getGreetings = async()=>{
      const greeting = await contract.greet();
      doGreeting(greeting)
      // console.log(greeting)
    }
    contract &&  getGreetings()
  },[contract])

  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className="input" type="text" id="value"></input>
      <button className="button" >
        Change
      </button>
    </div>
  );
}

export default App;
