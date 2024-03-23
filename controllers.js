const { Router } = require("express");
const { ErrorHandler, ResHandler } = require("./utliz/ResponseHandlers");
const {
  assetUploader,
  cloudinary,
  employeImageUploader,
  docsUploader,
  productUploader,
} = require("./utliz/FileUploader");
const Assets = require("./models/Assets");
const Employees = require("./models/Employe");
const Certificates = require("./models/Certificates");
const Products = require("./models/Products");
require("dotenv").config();

const route = Router();

// routes for uploading logos and videos
// @ Logo and Video Route
route.get("/assets", async (req, res) => {
  try {
    let assets = await Assets.find().select(["_id", "path", "mimetype"]);
    if (!assets.length) {
      throw new Error("Assets not found");
    }

    let payload = {
      assets,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/upload/asset", assetUploader, async (req, res) => {
  try {
    let file = req.file;

    if (!file) {
      throw new Error("Unexpected Error occured while uploading file.");
    }

    let asset = await Assets.create(file);

    let payload = {
      asset
    }

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, res, res);
  }
});

route.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new Error("Bad request.");
    }

    let asset = await Assets.findById(id).lean().exec();

    if (!asset) {
      throw new Error("File not found.");
    }

    let fileidPath = asset.filename;

    await cloudinary.api.delete_resources([fileidPath], {
      resource_type: asset?.mimetype?.split("/")[0],
      type: "upload",
    });

    await Assets.findByIdAndDelete(id).then((er) => {
      er;
    });

    return ResHandler({}, req, res);
  } catch (error) {
    console.log(error);
    return ErrorHandler(error, res, res);
  }
});

// routes for employees
route.get("/employees", async (req, res) => {
  try {
    let employees = await Employees.find({}).select(["-__v", "-updatedAt"]);
    let payload = {
      employees,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/employe/create", employeImageUploader, async (req, res) => {
  try {
    let employeeData = req.body;
    let file = req?.file;

    let { email, phone, designation, location, image, name, _id } =
      await Employees.create({
        ...employeeData,
        image: {
          ...file,
        },
      });

    let payload = {
      employe: { email, phone, designation, location, image, name, _id },
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.put("/employe/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    if (!id) {
      throw new Error("Bad Request");
    }

    let employe = await Employees.findByIdAndUpdate(id, data, { new: true });

    let payload = {
      employe,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.delete("/employe/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new Error("Bad request");
    }

    let employe = await Employees.findById(id);

    if (!employe) {
      throw new Error("Bad request");
    }

    let fileidPath = employe.image.filename;

    await cloudinary.api.delete_resources([fileidPath], {
      resource_type: employe?.image?.mimetype?.split("/")[0] ?? "image",
      type: "upload",
    });

    await Employees.findByIdAndDelete(id);

    return ResHandler({}, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/employe/image/:id", employeImageUploader, async (req, res) => {
  try {
    let { id } = req.params;

    let employe = await Employees.findById(id);

    let file = req?.file;

    if (!employe) {
      throw new Error("bad request");
    }

    if (employe.image) {
      await cloudinary.api.delete_resources([employe.image.filename], {
        resource_type: employe?.image?.mimetype?.split("/")[0] ?? "image",
        type: "upload",
      });
    }

    employe.image = file;
    await employe.save();

    let payload = { employe };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

// routes for certificates
route.get("/docs", async (req, res) => {
  try {
    let certificates = await Certificates.find({}).select([
      "-__v",
      "-updatedAt",
    ]);
    let payload = {
      docs: certificates,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/docs/upload", docsUploader, async (req, res) => {
  try {
    let files = req?.files;

    files.forEach(async (item) => {
      await Certificates.create(item);
    });

    let docs = await Certificates.find({}).select(["-__v", "-updatedAt"]);

    let payload = {
      docs,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.delete("/docs/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new Error("Bad request");
    }

    let doc = await Certificates.findById(id);

    if (!doc) {
      throw new Error("Certificate not found.");
    }

    await cloudinary.api.delete_resources([doc.filename], {
      resource_type: doc?.mimetype?.split("/")[0] ?? "image",
      type: "upload",
    });

    await Certificates.findByIdAndDelete(id);

    return ResHandler({}, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

// routes for Bac Store Product

route.get("/products", async (req, res) => {
  try {
    let products = await Products.find({}).select(["-__v", "-updatedAt"]);
    let payload = {
      products,
    };
    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/product/create", productUploader, async (req, res) => {
  try {
    let data = req.body;
    let file = req?.file;
    let newProduct = await Products.create({
      ...data,
      image: file,
    });

    let payload = {
      newProduct,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.put("/product/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    if (!id) {
      throw new Error("Bad Request");
    }

    let product = await Products.findByIdAndUpdate(id, data, { new: true });

    let payload = {
      product,
    };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.post("/product/update/image/:id", productUploader, async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Products.findById(id);

    let file = req?.file;

    if (!product) {
      throw new Error("bad request");
    }

    if (product.image) {
      await cloudinary.api.delete_resources([product.image.filename], {
        resource_type: product?.image?.mimetype?.split("/")[0] ?? "image",
        type: "upload",
      });
    }

    product.image = file;
    await product.save();

    let payload = { product };

    return ResHandler(payload, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

route.delete("/product/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new Error("Bad request");
    }

    let product = await Products.findById(id);

    if (!product) {
      throw new Error("Bad request");
    }

    let fileidPath = product.image.filename;

    await cloudinary.api.delete_resources([fileidPath], {
      resource_type: product?.image?.mimetype?.split("/")[0] ?? "image",
      type: "upload",
    });

    await Products.findByIdAndDelete(id);

    return ResHandler({}, req, res);
  } catch (error) {
    return ErrorHandler(error, req, res);
  }
});

module.exports = route;
