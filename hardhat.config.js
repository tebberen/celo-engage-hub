require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");

/** 
 * Celo Engage Hub - Profesyonel Hardhat Konfigürasyonu
 * Bu dosya Celo ağlarında kontrat deploy ve test etmek için gerekli
 */
module.exports = {
  // Solidty compiler ayarları
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,  // Gas optimizasyonu için
      },
      viaIR: true,  // Daha iyi optimizasyon
    },
  },

  // Celo network ayarları
  networks: {
    // Celo Alfajores Testnet
    alfajores: {
      url: process.env.CELO_RPC_URL || "https://alfajores-forno.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 44787,
      gas: 2100000,
      gasPrice: 5000000000, // 5 gwei
    },
    
    // Celo Mainnet
    celo: {
      url: process.env.CELO_MAINNET_RPC_URL || "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
      gas: 2100000,
      gasPrice: 5000000000,
    },
  },

  // Kontrat doğrulama için CeloScan ayarları
  etherscan: {
    apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY || "API_KEY_HERE",
      celo: process.env.CELOSCAN_API_KEY || "API_KEY_HERE",
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io"
        }
      }
    ]
  },

  // Gas raporu için ayarlar
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "CELO",
  },

  // Dosya yolları
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  // Test zaman aşımı
  mocha: {
    timeout: 60000
  }
};
