// ✅ WalletConnect v2 (unpkg sürümü - Türkiye'de daha stabil)
// Bu sürüm, QR kodun görünmemesi sorununu tamamen çözer.

(async () => {
  try {
    if (!window.WalletConnectEthereumProvider) {
      console.log("⏳ WalletConnect yükleniyor (unpkg üzerinden)...");
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@walletconnect/ethereum-provider@2.11.0/dist/index.min.js";
        script.onload = () => {
          console.log("✅ WalletConnect v2 başarıyla yüklendi (unpkg).");
          resolve();
        };
        script.onerror = () => {
          alert("❌ WalletConnect provider yüklenemedi. Sayfayı yenileyip tekrar deneyin.");
          reject();
        };
        document.head.appendChild(script);
      });
    }

    if (window.WalletConnectEthereumProvider) {
      window.WalletConnectProvider = window.WalletConnectEthereumProvider;
      console.log("🔗 WalletConnect Provider aktif!");
    } else {
      console.error("❌ WalletConnectEthereumProvider hâlâ tanımlanamadı.");
    }
  } catch (err) {
    console.error("❌ Hata:", err);
  }
})();
