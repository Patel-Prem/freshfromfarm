import multer from "multer";
import path from "path";
import fs from "fs";

import Produces from "../models/Produces.js";
import Files from "../models/Files.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatusCodes.js";

// Function to create directories if they don't exist
const ensureDirectoryExistence = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const userId = req.user.id;
      const produceId = req.produceId;
      const dir = path.join("uploads", userId, produceId);
      ensureDirectoryExistence(dir);
      cb(null, dir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const produceController = {
  // addProduce: async (req, res) => {
  //   try {
  //     req.body.merchant = req.user.id;
  //     const produce = new Produces(req.body);
  //     await produce.save();

  //     console.log("produce: ", produce._id);

  //     // calling API for storing Image if user selected any files to upload
  //     if (req.files?.length > 0) {
  //       if (produce._id) {
  //         const formData = new FormData();
  //         if (Array.isArray(req.files)) {
  //           req.files.forEach((file) => {
  //             formData.append("produce_media", file.buffer, {
  //               filename: file.originalname,
  //               contentType: file.mimetype,
  //             });
  //           });
  //         } else {
  //           console.error("req.files is not an array:", req.files);
  //         }

  //         axios
  //           .post(
  //             `http://localhost:8080/api/produce/addfile/${produce._id}`,
  //             formData,
  //             {
  //               // headers: {
  //               //   // Cookie: `accessToken=${req.cookies.accessToken}`,
  //               //   // Authorization = req.headers.Authorization || req.headers.authorization;
  //               // },
  //               withCredentials: true,
  //             }
  //           )
  //           .then((response) => {
  //             if (response.status !== 200) {
  //               return response.json().then((errorData) => {
  //                 throw new Error(errorData || "Something went wrong!");
  //               });
  //             }
  //             if (response.data.status) {
  //               res.status(200).json(response.data);
  //             } else {
  //               res.status(500).json(response.data);
  //             }
  //           })
  //           .catch((error) => {
  //             Produces.deleteMany({ _id: produce._id }).catch((error) => {
  //               console.log("Item not listed", error);
  //             });
  //             res.status(500).json({
  //               status: STATUS.FAILED,
  //               responseType: MESSAGES.RESPONSETYPE.FAILED,
  //               message: error.message,
  //             });
  //           });
  //       } else {
  //         throw new Error("Produces ID is missing");
  //       }
  //     } else {
  //       res.status(200).json({
  //         status: STATUS.SUCCEED,
  //         responseType: MESSAGES.RESPONSETYPE.SUCCEED,
  //         message: "Produce Listed Successfully without any Image(s)/Video(s)",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error ProduceController.js -> addProduce", error);
  //     res.status(500).json({
  //       status: STATUS.FAILED,
  //       responseType: MESSAGES.RESPONSETYPE.FAILED,
  //       message: error.message || error,
  //     });
  //   }
  // },

  addProduce: async (req, res) => {
    try {
      const produceData = {
        _id: req.produceId,        // Pre-generated produceId
        ...req.body,
        merchant: req.user.id,
      };

      const produce = new Produces(produceData);
      await produce.save();

      if (req.files && req.files.length > 0) {
        const fileDocs = req.files.map((file) => ({
          file_of: req.produceId,
          file_from: "produce",
          path: file.path,
          mimetype: file.mimetype,
        }));

        try {
          await Files.insertMany(fileDocs);
        } catch (fileError) {
          console.error("Error saving files to DB:", fileError);

          // Rollback: Delete produce since media saving failed
          try {
            await Produces.deleteOne({ _id: req.produceId });
            console.log(`Rolled back produce with ID ${req.produceId} due to file DB error.`);
          } catch (deleteError) {
            console.error("Failed to rollback produce after file error:", deleteError);
          }

          return res.status(MESSAGES.STATUS.INTERNAL_SERVER_ERROR).json({
            status: STATUS.FAILED,
            responseType: MESSAGES.RESPONSETYPE.FAILED,
            message: MESSAGES.PRODUCE.FAILED_TO_LIST,
          });
        }
      }

      res.status(STATUS.CREATED).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: req.files?.length > 0
          ? MESSAGES.PRODUCE.CREATED_WITH_MEDIA
          : MESSAGES.PRODUCE.CREATED_WITHOUT_MEDIA,
      });
    } catch (error) {
      console.error("Error in ProduceControoler.js -> addProduce:", error);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: error.message || MESSAGES.PRODUCE.EFAILED_TO_LIST
        // message: error.message || "An error occurred while adding produce.",
      });
    }
  },

  addProduceFiles: async (req, res) => {
    // addProduceMedia: async (req, res) => {
    try {
      console.log("req.files in addProduceFiles: ", req.files);
      for (const element of req.files) {
        const file = new Files({
          file_of: req.params["produceId"],
          file_from: "produce",
          path: element.path,
          mimetype: element.mimetype,
        });

        // await file.save();
      }
      console.log("produce image uploaded successfully");
      res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.PRODUCE.CREATED,
      });
    } catch (error) {
      console.error("Error ProduceController.js -> addProduceFiles", error);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.PRODUCE.FAILED_TO_UPLOAD_MEDIA,
      });
    }
  },

  deleteProduce: async (req, res) => {
    try {
      const { produceId } = req.body;
      const userId = req.user.id;

      if (!produceId) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.PRODUCE.NOT_FOUND,
        });
      }

      const [produce] = await Promise.all([
        Produces.findOneAndUpdate(
          { _id: produceId, merchant: userId, is_deleted: 0 },
          { $set: { is_deleted: 1 } },
          { new: true }
        ),
        Files.updateMany({ file_of: produceId }, { $set: { is_deleted: 1 } }),
      ]);

      if (!produce) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.PRODUCE.NOT_FOUND,
        });
      }

      res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: `${produce.name} deleted successfully.`,
      });
    } catch (error) {
      console.error("Error ProduceController.js -> deleteProduce:", error.message);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  getAllProduceDetails: async (req, res) => {
    try {
      const userId = req.user.id;

      const {
        sortBy = "createdAt",
        sortOrder = "desc",
        filterByUnit = "",
      } = req.query;

      const filter = {
        merchant: userId,
        is_deleted: 0
      };

      if (filterByUnit) {
        filter.quantity_unit = filterByUnit;
      }

      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

      const produces = await Produces.find(filter)
        .sort(sortOptions)
        .lean();

      const produceDetails = await Promise.all(
        produces.map(async (produce) => {
          const files = await Files.find(
            { file_of: produce._id, is_deleted: 0, file_from: "produce" },
            { path: 1, file_from: 1, mimetype: 1, _id: 0 }
          ).exec();
          produce.files = files;
          return produce;
        })
      );

      res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        // message: "Produces(s) fetched successfully",
        produceDetails,
      });
    } catch (error) {
      console.error("Error ProduceController.js -> getAllProduceDetails : ", error);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.PRODUCE.FAILED_TO_FETCH,
      });
    }
  },

  getProduceDetails: async (req, res) => {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const produce = await Produces.findOne({
        _id: id,
        merchant: userId,
        is_deleted: 0,
      }).lean(); // ✅ plain object instead of Mongoose doc

      if (!produce) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.PRODUCE.NOT_FOUND,
        });
      }

      const files = await Files.find(
        { file_of: produce._id, is_deleted: 0, file_from: "produce" },
        { path: 1, file_from: 1, mimetype: 1, _id: 0 }
      ).exec();

      produce.files = files; // ✅ works on plain object

      res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        // message: "Produce fetched successfully",
        produceDetails: produce, // ✅ not an array anymore
      });
    } catch (error) {
      console.error("Error ProduceController.js -> getProduceDetails : ", error);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.PRODUCE.FAILED_TO_FETCH,
      });
    }
  },

  upload,
};

export default produceController;