module.exports = app => {
  const reservations = require("../controllers/reservation.controller")

  var router = require("express").Router();

  // create
  router.post("/", reservations.create);
  // find all
  router.get("/", reservations.findAll);
  // find one
  router.get("/:id", reservations.findOne);
  // update
  router.put("/:id", reservations.update);
  // delete all
  router.delete("/", reservations.deleteAll);
  // delete one
  router.delete("/:id", reservations.delete);

  app.use("/api/reservations", router);
}