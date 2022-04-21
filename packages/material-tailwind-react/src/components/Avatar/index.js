import React, { forwardRef } from "react";
import PropTypes from "prop-types";

// utils
import classnames from "classnames";
import findMatch from "utils/findMatch";
import objectsToString from "utils/objectsToString";

// context
import { useTheme } from "context/theme";

const Avatar = forwardRef(({ variant, size, className, ...rest }, ref) => {
  // 1. init
  const { avatar } = useTheme();
  const { valid, defaultProps, styles } = avatar;
  const { base, variants, sizes } = styles;

  // 2. set default props
  variant = variant ?? defaultProps.variant;
  size = size ?? defaultProps.size;
  className = className ?? defaultProps.className;

  // 3. set styles
  const avatarVariant = variants[findMatch(valid.variants, variant, "rounded")];
  const avatarSize = objectsToString(sizes[findMatch(valid.sizes, size, "md")]);
  const classes = classnames(objectsToString(base), avatarVariant, avatarSize, className);

  // 4. return
  return <img {...rest} ref={ref} className={classes} />;
});

Avatar.propTypes = {
  variant: PropTypes.oneOf(["rounded", "circular"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  className: PropTypes.string,
};

Avatar.displayName = "Avatar";

export { Avatar };
export default Avatar;
