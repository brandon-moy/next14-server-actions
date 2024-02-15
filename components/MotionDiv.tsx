// this lets us return a client side rendered div to be able to be a framer-motion div, but keep the rest of the page server side rendered
"use client";

import { motion } from "framer-motion";

export const MotionDiv = motion.div;
