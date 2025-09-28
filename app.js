document.addEventListener("DOMContentLoaded", function () {

    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", async () => {

        if (!window.ethereum) {
            alert("MetaMask not detected!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractAddress = "0xbdf087f85af5d5187de2c11f3bad90edbc6fe0bf";

        const abi = [
            {
                "inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],
                "name":"getProject","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
            },
            {
                "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
                "name":"projects","outputs":[{"internalType":"address","name":"author","type":"address"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"link","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"
            },
            {
                "inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_link","type":"string"}],
                "name":"submitProject","outputs":[],"stateMutability":"nonpayable","type":"function"
            },
            {
                "inputs":[],"name":"totalProjects","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"
            }
        ];

        const contract = new ethers.Contract(contractAddress, abi, signer);

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const link = document.getElementById("link").value;

        try {
            const tx = await contract.submitProject(title, description, link);
            await tx.wait();
            alert("Project submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Transaction failed! Check console.");
        }

    });
});