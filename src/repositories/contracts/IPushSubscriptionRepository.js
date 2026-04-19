class IPushSubscriptionRepository {
  async save(subscriptionData) {
    throw new Error("Method not implemented");
  }

  async findAll() {
    throw new Error("Method not implemented");
  }

  async findByEndpoint(endpoint) {
    throw new Error("Method not implemented");
  }

  async findByUserId(userId) {
    throw new Error("Method not implemented");
  }

  async deleteByEndpoint(endpoint) {
    throw new Error("Method not implemented");
  }

  async deactivateByEndpoint(endpoint) {
    throw new Error("Method not implemented");
  }

  async activateByEndpoint(endpoint) {
    throw new Error("Method not implemented");
  }
}

export default IPushSubscriptionRepository;
