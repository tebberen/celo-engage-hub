// app.js

async function init() {
    if (typeof window.ethereum === "undefined") {
        alert("Lütfen MetaMask veya Celo Wallet yükle!");
        return;
    }

    // Provider ve signer ayarı
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // Kontrat adresi (senin Remix'ten deploy ettiğin)
    const contractAddress = "0xbdf087f85af5d5187de2c11f3bad90edbc6fe0bf";

    // ABI (Remix’ten aldığın)
    const abi = [
        {
            "inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],
            "name":"getProject",
            "outputs":[
                {"internalType":"address","name":"","type":"address"},
                {"internalType":"string","name":"","type":"string"},
                {"internalType":"string","name":"","type":"string"},
                {"internalType":"string","name":"","type":"string"},
                {"internalType":"uint256","name":"","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
            "name":"projects",
            "outputs":[
                {"internalType":"address","name":"author","type":"address"},
                {"internalType":"string","name":"title","type":"string"},
                {"internalType":"string","name":"description","type":"string"},
                {"internalType":"string","name":"link","type":"string"},
                {"internalType":"uint256","name":"timestamp","type":"uint256"}
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {"internalType":"string","name":"_title","type":"string"},
                {"internalType":"string","name":"_description","type":"string"},
                {"internalType":"string","name":"_link","type":"string"}
            ],
            "name":"submitProject",
            "outputs":[],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[],
            "name":"totalProjects",
            "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
            "stateMutability":"view",
            "type":"function"
        }
    ];

    // Contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Form submit event
    document.getElementById("submitButton").addEventListener("click", async () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const link = document.getElementById("link").value;

        if (!title || !description || !link) {
            alert("Lütfen tüm alanları doldur!");
            return;
        }

        try {
            const tx = await contract.submitProject(title, description, link);
            await tx.wait();
            alert("Proje başarıyla gönderildi!");
            // Formu temizle
            document.getElementById("projectForm").reset();
        } catch (error) {
            console.error(error);
            alert("Hata: " + error.message);
        }
    });
}

window.onload = init;
