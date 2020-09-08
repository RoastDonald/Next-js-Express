import { Router } from "express";

const router = Router();

export default (app) => {
  app.use("/products", router);

  app.get("/api/product/articles", (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find()
      .populate("brand")
      .populate("wood")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, articles) => {
        if (err) return res.status(400).send(err);
        res.send(articles);
      });
  });

  /// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
  app.get("/api/product/articles_by_id", (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map((item) => {
        return mongoose.Types.ObjectId(item);
      });
    }

    Product.find({ _id: { $in: items } })
      .populate("brand")
      .populate("wood")
      .exec((err, docs) => {
        return res.status(200).send(docs);
      });
  });

  app.post("/api/product/article", auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        article: doc,
      });
    });
  });

  //=================================
  //              WOODS
  //=================================

  app.post("/api/product/wood", auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        wood: doc,
      });
    });
  });

  app.get("/api/product/woods", (req, res) => {
    Wood.find({}, (err, woods) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(woods);
    });
  });

  //=================================
  //              BRAND
  //=================================

  app.post("/api/product/brand", auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        brand: doc,
      });
    });
  });

  app.get("/api/product/brands", (req, res) => {
    Brand.find({}, (err, brands) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(brands);
    });
  });
};
