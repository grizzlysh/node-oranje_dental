const db          = require("../models");
const Reservation = db.reservations;
const Op          = db.Sequ

// create and save
exports.create = (req, res) => {
  // validate
  if (!req.body.title){
    res.status(400).send({
      message: "Content can not be empty!"
    })
    return;
  }
  // create
  const reservation = {
    first_name    : req.body.first_name,
    last_name     : req.body.last_name,
    reserved_total: req.body.reserved_total,
    reserved_date : req.body.reserved_date,
    reserved_time : req.body.reserved_time,
    status        : req.body.status ? req.body.status : "WAITING",
  }

  Reservation.create(reservation)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the reservation"
      })
    })
}

// find all
exports.findAll = (req, res) => {
  const searchText = req.query.searchText;
  var conditon = searchText ? { first_name: { [Op.iLike]: `%{searchText}%` } } : null;

  Reservation.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the reservation"
      })
    })
  
}

// find one
exports.findOne = (req, res) => {
  const id = req.params.id;
  Reservation.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else{
        res.status(404).send({
          message: `Cannot find Reservation with id: ${id}`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the reservation"
      })
    })
}

// update
exports.update = (req, res) => {
  const id = req.params.id;
  Reservation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reservation was updated successfully"
        })
      }
      else {
        res.send({
          message: "Cannot update reservation, maybe reservation not found or update data is empty"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while updating the reservation"
      })
    })
}

// delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Reservation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reservation was deleted successfully"
        })
      }
      else {
        res.send({
          message: "Cannot delete reservation, maybe reservation not found"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while removing the reservation"
      })
    })
}

// delete all
exports.deleteAll = (req, res) => {
  Reservation.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        message:`${nums} reservations were deleted successfully`
      })
    })
    
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while removing all reservations"
      })
    })
}