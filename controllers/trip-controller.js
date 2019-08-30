const express = require('express');
const router = express.Router();
const passport = require('passport');
const Trip = require("../models/trip_model");
const db = require("../models");