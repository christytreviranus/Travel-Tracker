const express = require('express');
const router = express.Router();
const passport = require('passport');
const Entry = require("../models/entry_model");
const db = require("../models");