import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

import contractAbi from "./util/WavePortal.abi.json";
import MessageDialog from "./components/MessageDialog";
import WaveLog from "./components/WUPHFLog";

const contractAddr = "0x782Ece9bcE1D2C510B98ce1706f14BB57fFd697E";
export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWaveClick = () => {
    setDialogOpen(true);
  };

  const wave = async (message) => {
    if (!message) {
      return;
    }

    try {
      const { ethereum } = window;
      if (ethereum) {
        setDialogOpen(true);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddr,
          contractAbi.abi,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(message);
        console.log(
          "Transaction sent: ",
          waveTxn.hash,
          "with message: ",
          message
        );

        await waveTxn.wait();
        console.log("Transaction mined: ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        getAllWaves();
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      getAllWaves();
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddr,
          contractAbi.abi,
          signer
        );

        let waves = await wavePortalContract.getWaves();

        let cleanedWaves = [];
        waves.forEach((wave) => {
          cleanedWaves.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(cleanedWaves);
      } else {
        console.log("No Ethereum");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // let wavePortalContract;
  
    // const onNewWave = (from, message,timestamp) => {
    //   console.log('NewWave', from, timestamp, message);
    //   setAllWaves(prevState => [
    //     ...prevState,
    //     {
    //       waver: from,
    //       timestamp: new Date(timestamp * 1000),
    //       message: message,
    //     },
    //   ]);
    // };
  
    // if (window.ethereum) {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   wavePortalContract = new ethers.Contract(contractAddr, contractAbi.abi, signer);
    //   wavePortalContract.on('NewWave', onNewWave);
    // }
  
    // return () => {
    //   if (wavePortalContract) {
    //     wavePortalContract.off('NewWave', onNewWave);
    //   }
    // };
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Hey 👋, I'm Nishay!</div>
        <div className="bio">
          I'm a Software developer exploring Web3. <br />
          Send me a WUPHF and have a chance to win some eth 💰. <br />
          Inspired by{" "}
          <a href="https://www.youtube.com/results?search_query=WUPHF">WUPHF</a>
        </div>

        {currentAccount && (
          <button className="waveButton" onClick={handleWaveClick}>
            Wave at Me
          </button>
        )}
        {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {dialogOpen && (
          <MessageDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            setConfirm={wave}
          ></MessageDialog>
        )}

        <div className="log">
          <div className="m-auto flex flex-col justify-center py-8">
            <p className="text-4xl font-extrabold text-gray-800 py-4">
              WUPHF Log 👀
            </p>
            <p>{"Check out all these people out here waving!"}</p>

            {allWaves.map((wave, index) => {
              console.log(wave);
              return (
                <WaveLog
                  waver={wave.address}
                  timestamp={wave.timestamp}
                  message={wave.message}
                ></WaveLog>
              );
            })}
          </div>

          
        </div>
      </div>
    </div>
  );
}
