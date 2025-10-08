// ✅ WalletConnect v2 tanımlayıcı dosyası
// Bu dosya, WalletConnect Ethereum Provider'ı tarayıcıda aktif hale getirir.

(async () => {
  // WalletConnect kütüphanesini dinamik olarak yükle
  if (!window.WalletConnectEthereumProvider) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@walletconnect/ethereum-provider@2.11.0/dist/index.min.js?v=2.11.0";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      console.log("✅ WalletConnect v2 kütüphanesi başarıyla yüklendi.");
    } catch (err) {
      console.error("❌ WalletConnect yüklenemedi:", err);
      alert("WalletConnect provider yüklenemedi. Sayfayı yenileyip tekrar deneyin.");
    }
  }

  // EthereumProvider'ı global olarak tanımla
  if (window.WalletConnectEthereumProvider) {
    window.WalletConnectProvider = window.WalletConnectEthereumProvider;
    console.log("🔗 WalletConnect Provider başarıyla tanımlandı.");
  } else {
    console.error("❌ WalletConnectEthereumProvider bulunamadı.");
  }
})();
