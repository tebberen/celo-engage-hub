const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Celo Engage Hub Deployment Başlıyor...\n");

  // Deploy eden hesabı al
  const [deployer] = await ethers.getSigners();
  console.log(`📦 Deployer Address: ${deployer.address}`);

  // Hesap bakiyesini kontrol et
  const balance = await deployer.getBalance();
  console.log(`💰 Deployer Balance: ${ethers.utils.formatEther(balance)} CELO\n`);

  // Contract factory oluştur
  console.log("📄 Contract derleniyor...");
  const CeloEngageHub = await ethers.getContractFactory("CeloEngageHub");

  // Contract'ı deploy et
  console.log("🛠️ Contract deploy ediliyor...");
  const engageHub = await CeloEngageHub.deploy();

  console.log("⏳ Deployment onaylanması bekleniyor...");
  await engageHub.deployed();

  console.log("✅ CeloEngageHub başarıyla deploy edildi!");
  console.log(`📝 Contract Address: ${engageHub.address}\n`);

  // Contract ABI ve adresini kaydet
  console.log("💾 Contract bilgileri kaydediliyor...");
  const contractInfo = {
    address: engageHub.address,
    deployer: deployer.address,
    network: "alfajores",
    timestamp: new Date().toISOString(),
    contractName: "CeloEngageHub"
  };

  // deployment-info klasörüne kaydet
  const infoDir = path.join(__dirname, "..", "deployment-info");
  if (!fs.existsSync(infoDir)) {
    fs.mkdirSync(infoDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(infoDir, "deployment.json"),
    JSON.stringify(contractInfo, null, 2)
  );

  // Verify için gerekli bilgiler
  console.log("🔍 CeloScan'de verify etmek için komut:");
  console.log(`npx hardhat verify --network alfajores ${engageHub.address}\n`);

  // Kontratın başlangıç durumunu kontrol et
  console.log("🔎 Kontrat başlangıç durumu kontrol ediliyor...");
  const totalUsers = await engageHub.totalUsers();
  const proposalCount = await engageHub.proposalCount();

  console.log(`👥 Başlangıç kullanıcı sayısı: ${totalUsers}`);
  console.log(`📋 Başlangıç proposal sayısı: ${proposalCount}`);

  console.log("\n🎉 Deployment başarıyla tamamlandı!");
  console.log("🌐 CeloScan'de görüntülemek için:");
  console.log(`https://alfajores.celoscan.io/address/${engageHub.address}`);
}

// Hata yönetimi
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment hatası:", error);
    process.exit(1);
  });
