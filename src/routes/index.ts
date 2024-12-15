import express from 'express';
import ImageController from '../controllers/image-controller';
import { upload } from '../configs/multer';

const apiRouter = express.Router()

// images
apiRouter.get("/image/list", ImageController.list)
apiRouter.post("/image/add", upload.single("image"), ImageController.add)
apiRouter.delete("/image/remove/:id", ImageController.remove)

export default apiRouter

