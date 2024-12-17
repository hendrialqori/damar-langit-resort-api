import express from 'express';
import ImageController from '../controllers/image-controller';
import MapController from '../controllers/map-controller';
import TypeSubMenuController from '../controllers/typesubmenu-controller';
import PromoController from '../controllers/promo-controlle';
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

// maps
apiRouter.get("/map/list", MapController.list)
apiRouter.post("/map/add", upload.single("image"), MapController.add)
apiRouter.delete("/map/remove/:id", MapController.remove)

// maps
apiRouter.get("/promo/list", PromoController.list)
apiRouter.post("/promo/add", upload.single("image"), PromoController.add)
apiRouter.delete("/promo/remove/:id", PromoController.remove)

export default apiRouter

