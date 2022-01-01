const wave = async (waveContract,randomPerson) => {
    let waveCount = await waveContract.getTotalWaves();
    console.log("Waves : "+ waveCount);


    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("Contract Bal: ", contractBalance);


    let wavTxn = await waveContract.connect(randomPerson).wave("The answer is 24");
    let wavTxnRecpt = await wavTxn.wait();

    //Now check if i got any eth or not 
    let newRandomPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);

    console.log("RandomPerson:",randomPerson.address, "=", newRandomPersonBalance);
    console.log("Gas Paid: ", wavTxnRecpt.gasUsed);


    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Bal: ", contractBalance);




    //and check if it has been removed
    waveCount = await waveContract.getTotalWaves();
    console.log("Waves : "+ waveCount);

    let waves = await waveContract.getWaves();
    console.log("Waves: ", waves);


}
const main = async () => {


    const [owner, randomPerson] = await hre.ethers.getSigners();

    let randomPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);

    console.log("RandomPerson:",randomPerson.address, "=", hre.ethers.utils.formatEther(randomPersonBalance));


    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value:  hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();

    console.log("WaveContract.sol @",waveContract.address);
    console.log("Deployed by: ",owner.address)

    
    await wave(waveContract, randomPerson);
    await wave(waveContract, randomPerson);


}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();