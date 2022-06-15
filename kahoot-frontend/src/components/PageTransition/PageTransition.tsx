import * as React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const PageTransition = (props: HTMLMotionProps<'div'>) => (
  <motion.div initial={{ y: -16 }} animate={{ y: 0 }} transition={{ duration: 0.15 }} {...props} />
);

export default PageTransition;
