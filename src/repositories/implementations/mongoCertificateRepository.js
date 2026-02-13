import ICertificateRepository from "../contracts/ICertificateRepository.js";
import Certificate from "../../models/certificate.model.js";

class MongoCertificateRepository extends ICertificateRepository {

    async create(data) {
        try {
            const certificateData = new Certificate(data);
            return await certificateData.save();
        } catch (err) {
            if (err.code === 11000) {
                throw { status: 400, message: "Failed to create certificate" };
            }
            throw err;
        }
    }

    async findByName(name) {
        return await Certificate.findOne({ name })
    }

    async findById(id) {
        return await Certificate.findById(id);
    }

    async findAll() {
        return await Certificate.find();
    }

    async update(id, updateData) {
        try {
            const updated = await Certificate.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });
            return updated;
        } catch (err) {
            if (err.code === 11000) {
                throw { status: 400, message: "Cretificate name already exists" };
            }
            throw err;
        }
    }

    async delete(id) {
        return await Certificate.findByIdAndDelete(id);
    }
}

export default MongoCertificateRepository;
