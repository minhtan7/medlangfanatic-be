const express = require('express');
const podcastController = require('../controller/podcast.controller');
const router = express.Router();

router.get("/", podcastController.getAllPodcasts)
router.post("/", podcastController.createPodcast)
router.get("/:id", podcastController.getSinglePodcast)
router.put("/:id", podcastController.updatePodcast)
router.delete("/:id", podcastController.deletePodcast)
