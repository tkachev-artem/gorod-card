// Mock API for the LKR page

export const api = {
  vcard: {
    getInfo: async () => {
      // Mock implementation
      return {
        cardNumber: "1345 3745 4433 2355",
        status: "active",
        expiryDate: "12/25"
      };
    },
    request: async () => {
      // Mock implementation
      return {
        success: true,
        message: "Card request submitted successfully"
      };
    }
  },
  balance: {
    getRubleBalance: async () => {
      // Mock implementation
      return {
        balance: 0
      };
    },
    getBonusBalance: async () => {
      // Mock implementation
      return {
        balance: 0
      };
    }
  }
}; 