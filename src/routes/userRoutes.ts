import { Router } from "express";
import { getAllUser, getOneUSer, signin, signup } from "../controller/userContoller";


const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/getallusers").get(getAllUser)
router.route("/getoneuser/:id").get(getOneUSer)



export default router;
