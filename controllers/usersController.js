const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, myUser) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "El email no fue encontrado",
        });
      }

      const isPassportValid = await bcrypt.compare(passport, myUser.passport);
      if (isPassportValid) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKeys,
          {}
        );
        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          telephone: myUser.telephone,
          image: myUser.image,
          session_token: `JWT ${token}`,
        };
        return res.status(201).json({
          success: true,
          message: "El usuario fue autenticado ",
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "El password no fue encontrado",
        });
      }
    });
  },
  register(req, res) {
    const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    User.create(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error con el registro del usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El registro se realizo correctamente",
        data: data, // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
      });
    });
  },
};
