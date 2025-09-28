async function init() {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
        await provider.send("eth_requestAccounts", []);
    } catch (error) {
        alert("Wallet connection rejected.");
        return;
    }

    const signer = provider.getSigner();

    // Remix üzerinden deploy edilen contract adresini buraya koy
    const contractAddress = "DEPOLYED_CONTRACT_ADDRESS";

    const abi = [
        "function submitProject(string memory _title, string memory _description, string memory _link) public",
        "function getProject(uint _index) public view returns (address, string memory, string memory, string memory, uint)",
        "function totalProjects() public view returns (uint)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    document.getElementById('projectForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const link = document.getElementById('link').value;

        try {
            const tx = await contract.submitProject(title, description, link);
            await tx.wait();
            alert("Project submitted to Celo Engage Hub!");
            this.reset();
        } catch (err) {
            alert("Transaction failed: " + err.message);
        }
    });
}

init();
