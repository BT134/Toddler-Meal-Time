import React from 'react';
import { Box } from "@chakra-ui/react"

const Footer = () => {

  return (
    <footer>
      <Box position="absoulte" bottom="0">
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Brenton Turnor.
        </h4>
      </Box>
    </footer>
  );
};

export default Footer;