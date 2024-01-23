import catRouter from "./cat/routes.js";
import brandRouter from "./brand/routes.js";
import membershipRouter from "./membership/routes.js";
import productRouter from "./product/routes.js";
import unitRouter from "./unit/routes.js";
import customerRouter from "./customer/routes.js";
import transactionRouter from "./transaction/routes.js";

import adminRouter from "./admin/routes.js";
import sliderRouter from "./slider/routes.js";
import Services from "./services/index.js";
import generalRouter from "./general/routes.js";
import langRouter from "./lang/routes.js";
import homeRouter from "./home/routes.js";
import aboutRouter from "./about/routes.js";
import treatmentRouter from "./treatment/routes.js";
import treatmentPageRouter from "./treatmentPage/routes.js";
import contactRouter from "./contact/routes.js";
import translateRouter from "./translate/routes.js";
import userRouter from "./user/routes.js";
import catalogPageRouter from "./catalogPage/routes.js";
import catalogImageRouter from "./catalogImage/routes.js";


export default function (app) {
  app.use("/cat", catRouter);
  app.use("/brand", brandRouter);
  app.use("/membership", membershipRouter);
  app.use("/product", productRouter);
  app.use("/unit", unitRouter);
  app.use("/customer", customerRouter);
  app.use("/transaction", transactionRouter);
  app.use("/user", userRouter);
  app.use("/catalogPage", catalogPageRouter);
  app.use("/catalogImage", catalogImageRouter);

 
 
 
  app.use("/admin", adminRouter);
  app.use("/slider", sliderRouter);
  app.use("/lang", langRouter);
  app.use("/home", homeRouter);
  app.use("/about", aboutRouter);
  app.use("/treatment", treatmentRouter);
  app.use("/services", Services.router);
  app.use("/general", generalRouter);
  app.use("/treatmentpage", treatmentPageRouter);
  app.use("/contact", contactRouter);
  app.use("/translate", translateRouter);
  app.get("/", async (req, res) => {
    return res.json({ message: "Hello World !" });
  });
}
