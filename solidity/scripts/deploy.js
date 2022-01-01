
const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    const bal = await deployer.getBalance();

    console.log("Deploying with address: ", deployer.address);
    console.log("Account Balance: ", bal.toString())

    const Token = await hre.ethers.getContractFactory("WavePortal");
    
    const portal = await Token.deploy({
        value:  hre.ethers.utils.parseEther('0.1'),
    });
    await portal.deployed();

    console.log("WavePortal @", portal.address);

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