const express = require("express");
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const router  = express.Router();

const upload = multer({storage:multer.memoryStorage()});

router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.music);
router.post("/album",authMiddleware.authArtist,musicController.album);
router.get("/",authMiddleware.authUser,musicController.getAllMusics);
router.get("/albums",authMiddleware.authUser,musicController.getAllalbums);
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAlbum);

module.exports = router;