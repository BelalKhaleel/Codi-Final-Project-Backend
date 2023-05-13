import Address from "../models/addressModel.js";

// get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({});
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get address by id
export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // create new address
// export const createAddress = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     const { governorate } = req.body;
//     if (!Address.schema.path('governorate').enumValues.includes(governorate)) {
//       return res.status(400).json({ message: 'Governorate does not exist' });
//     }
//     const address = new Address(req.body);
//     const createdAddress = await address.save();
//     res.status(201).json(createdAddress);
//   } catch (error) {
//     next(error);
//   }
// };

// create new address
export const createAddress = async (req, res, next) => {
  try {
    const { governorate, district, city } = req.body;

    if (!governorate) {
      return res.status(400).json({ message: 'Governorate is required!' });
    }

    if (!Address.schema.path('governorate').enumValues.includes(governorate)) {
      return res.status(400).json({ message: 'Governorate does not exist!' });
    }

    if (!district) {
      return res.status(400).json({ message: 'District is required!'});
    }

    if (!city) {
      return res.status(400).json({ message: 'City is required!' });
    }

    const address = new Address(req.body);
    const createdAddress = await address.save();
    res.status(201).json(createdAddress);
  } catch (error) {
    next(error);
  }
};

// edit address by id
export const editAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = req.body;

    const address = await Address.findByIdAndUpdate(id, updatedAddress, {
      new: true,
      runValidators: true,
    });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete address by id
export const deleteAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json({address, message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const Controller = {
//   getAllAddresses,
//   getAddressById,
//   createAddress,
//   editAddressById,
//   deleteAddressById,
// };

// export default Controller;