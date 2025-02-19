const express = require('express');
const openaiRoutes = require('./openaiRoutes');
const supabaseRoutes = require('./supabaseRoutes');
const paymentRoutes = require('./paymentRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();
router.use(express.json());

const defaultRoutes = [
  { path: '/openai', route: openaiRoutes },
  {  path: '/supabase', route: supabaseRoutes },
  {  path: '/payments', route: paymentRoutes },
  { path: '/auth', route: authRoutes },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
