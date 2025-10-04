const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("CeloEngageHub Contract Tests", function () {
  let engageHub;
  let owner;
  let user1;
  let user2;
  let user3;

  // Test timeout'u 40 saniye
  this.timeout(40000);

  beforeEach(async function () {
    // Signer'ları al
    [owner, user1, user2, user3] = await ethers.getSigners();
    
    // Contract factory oluştur
    const CeloEngageHub = await ethers.getContractFactory("CeloEngageHub");
    
    // Contract'ı deploy et
    engageHub = await CeloEngageHub.deploy();
    await engageHub.deployed();

    console.log("✅ Contract deployed to:", engageHub.address);
  });

  describe("📝 User Registration Tests", function () {
    it("Should register a new user successfully", async function () {
      // Kullanıcı kaydı
      await engageHub.connect(user1).registerUser("alice", "https://alice.com");
      
      // Kullanıcı profilini kontrol et
      const userProfile = await engageHub.getUserProfile(user1.address);
      
      // Assertions
      expect(userProfile.username).to.equal("alice");
      expect(userProfile.link).to.equal("https://alice.com");
      expect(userProfile.isActive).to.be.true;
      expect(userProfile.supportCount).to.equal(0);
      expect(userProfile.reputation).to.equal(0);
    });

    it("Should prevent duplicate user registration", async function () {
      // İlk kayıt
      await engageHub.connect(user1).registerUser("alice", "https://alice.com");
      
      // İkinci kayıt denemesi - hata vermeli
      await expect(
        engageHub.connect(user1).registerUser("alice2", "https://alice2.com")
      ).to.be.revertedWith("AlreadyRegistered()");
    });

    it("Should update user profile successfully", async function () {
      // Önce kayıt ol
      await engageHub.connect(user1).registerUser("alice", "https://alice.com");
      
      // Profili güncelle
      await engageHub.connect(user1).updateProfile("alice_updated", "https://alice-updated.com");
      
      // Güncellenmiş profili kontrol et
      const userProfile = await engageHub.getUserProfile(user1.address);
      
      expect(userProfile.username).to.equal("alice_updated");
      expect(userProfile.link).to.equal("https://alice-updated.com");
    });
  });

  describe("🗳️ Proposal System Tests", function () {
    beforeEach(async function () {
      // Test için kullanıcı kaydı
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      await engageHub.connect(user2).registerUser("user2", "https://user2.com");
    });

    it("Should create a proposal successfully", async function () {
      const proposalDuration = 7 * 24 * 60 * 60; // 7 gün
      
      // Proposal oluştur
      await expect(
        engageHub.connect(user1).createProposal(
          "Test Proposal Title",
          "Test Proposal Description",
          proposalDuration
        )
      ).to.emit(engageHub, "ProposalCreated");
      
      // Proposal detaylarını kontrol et
      const activeProposals = await engageHub.getActiveProposals();
      expect(activeProposals.length).to.equal(1);
      
      const proposalDetails = await engageHub.getProposalDetails(activeProposals[0]);
      expect(proposalDetails.title).to.equal("Test Proposal Title");
      expect(proposalDetails.creator).to.equal(user1.address);
    });

    it("Should allow voting on proposals", async function () {
      const proposalDuration = 3 * 24 * 60 * 60; // 3 gün
      
      // Proposal oluştur
      await engageHub.connect(user1).createProposal(
        "Voting Test",
        "Test description",
        proposalDuration
      );
      
      const activeProposals = await engageHub.getActiveProposals();
      const proposalId = activeProposals[0];
      
      // Oy kullan
      await expect(
        engageHub.connect(user2).voteProposal(proposalId, true) // Support: true
      ).to.emit(engageHub, "Voted");
      
      // Oy sonuçlarını kontrol et
      const proposalDetails = await engageHub.getProposalDetails(proposalId);
      expect(proposalDetails.votesFor).to.equal(1);
      expect(proposalDetails.votesAgainst).to.equal(0);
    });

    it("Should prevent double voting", async function () {
      const proposalDuration = 3 * 24 * 60 * 60;
      
      await engageHub.connect(user1).createProposal("Test", "Desc", proposalDuration);
      const activeProposals = await engageHub.getActiveProposals();
      const proposalId = activeProposals[0];
      
      // İlk oy
      await engageHub.connect(user2).voteProposal(proposalId, true);
      
      // İkinci oy denemesi - hata vermeli
      await expect(
        engageHub.connect(user2).voteProposal(proposalId, false)
      ).to.be.revertedWith("AlreadyVoted()");
    });
  });

  describe("🏆 Badge System Tests", function () {
    it("Should award badges to users", async function () {
      // Kullanıcı kaydı
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      
      // Badge ver (sadece owner yapabilir)
      await expect(
        engageHub.connect(owner).awardBadge(user1.address, "Early Supporter")
      ).to.emit(engageHub, "BadgeAwarded");
      
      // Kullanıcı badge'lerini kontrol et
      const userBadges = await engageHub.getUserBadges(user1.address);
      expect(userBadges.length).to.equal(1);
      expect(userBadges[0]).to.equal("Early Supporter");
    });

    it("Should not allow non-owners to award badges", async function () {
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      
      // User2 badge vermeye çalışsın (owner değil)
      await expect(
        engageHub.connect(user2).awardBadge(user1.address, "Test Badge")
      ).to.be.reverted; // Reverted without specific error
    });
  });

  describe("📊 Platform Statistics Tests", function () {
    it("Should return correct user count", async function () {
      // Başlangıçta 0 kullanıcı
      expect(await engageHub.totalUsers()).to.equal(0);
      
      // Kullanıcı kaydı
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      await engageHub.connect(user2).registerUser("user2", "https://user2.com");
      
      // 2 kullanıcı olmalı
      expect(await engageHub.totalUsers()).to.equal(2);
    });

    it("Should return all registered users", async function () {
      // Kullanıcı kayıtları
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      await engageHub.connect(user2).registerUser("user2", "https://user2.com");
      
      // Tüm kullanıcıları getir
      const allUsers = await engageHub.getAllUsers();
      
      expect(allUsers.length).to.equal(2);
      expect(allUsers).to.include(user1.address);
      expect(allUsers).to.include(user2.address);
    });
  });

  describe("⏰ Time-Based Tests", function () {
    it("Should handle proposal expiration correctly", async function () {
      const proposalDuration = 3600; // 1 saat
      
      // Proposal oluştur
      await engageHub.connect(user1).registerUser("user1", "https://user1.com");
      await engageHub.connect(user1).createProposal("Test", "Desc", proposalDuration);
      
      const activeProposals = await engageHub.getActiveProposals();
      const proposalId = activeProposals[0];
      
      // Zamanı ileri sar (proposal'ın süresi dolmuş olsun)
      await time.increase(proposalDuration + 1);
      
      // Süresi dolmuş proposal'a oy verilememeli
      await engageHub.connect(user2).registerUser("user2", "https://user2.com");
      
      await expect(
        engageHub.connect(user2).voteProposal(proposalId, true)
      ).to.be.revertedWith("VotingEnded()");
    });
  });
});
