import express from 'express';
import ImageController from '../controllers/image-controller';
import TypeSubMenuController from '../controllers/typesubmenu-controller';
import { upload } from '../configs/multer';

const apiRouter = express.Router()

// images
apiRouter.get("/image/list", ImageController.list)
apiRouter.post("/image/add", upload.single("image"), ImageController.add)
apiRouter.delete("/image/remove/:id", ImageController.remove)

// typesubmenu
apiRouter.get("/typesubmenu/list", TypeSubMenuController.list)
apiRouter.post("/typesubmenu/add", TypeSubMenuController.add)
apiRouter.put("/typesubmenu/update/:id", TypeSubMenuController.update)

export default apiRouter

