import { Icon, IconProps } from "@chakra-ui/react";

import { useColorMode } from "@/shared/application/hooks";

export const IconMenu = (props: IconProps) => {
  const { colorMode } = useColorMode();

  return (
    <Icon {...props} aria-label="Menu icon">
      <svg
        width="13"
        height="4"
        viewBox="0 0 13 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.6875 1.75C9.6875 1.03906 10.2617 0.4375 11 0.4375C11.7109 0.4375 12.3125 1.03906 12.3125 1.75C12.3125 2.48828 11.7109 3.0625 11 3.0625C10.2617 3.0625 9.6875 2.48828 9.6875 1.75ZM5.3125 1.75C5.3125 1.03906 5.88672 0.4375 6.625 0.4375C7.33594 0.4375 7.9375 1.03906 7.9375 1.75C7.9375 2.48828 7.33594 3.0625 6.625 3.0625C5.88672 3.0625 5.3125 2.48828 5.3125 1.75ZM3.5625 1.75C3.5625 2.48828 2.96094 3.0625 2.25 3.0625C1.51172 3.0625 0.9375 2.48828 0.9375 1.75C0.9375 1.03906 1.51172 0.4375 2.25 0.4375C2.96094 0.4375 3.5625 1.03906 3.5625 1.75Z"
          fill={colorMode === "light" ? "#211F33" : "#cecac3"}
        />
      </svg>
    </Icon>
  );
};
