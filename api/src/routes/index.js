const { Router } = require("express");
// Importar todos los routers;
const videogamesRouter = require("./videogames");
const genreRouter = require("./genres");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogamesRouter);
router.use("/videogame", videogamesRouter);
router.use("/genres", genreRouter);

module.exports = router;
