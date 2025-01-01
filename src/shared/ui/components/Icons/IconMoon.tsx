import { Icon, IconProps } from "@chakra-ui/react";

export const IconMoon = (props: IconProps) => {
  return (
    <Icon {...props} aria-label="Icon moon">
      <svg
        stroke="#FFFFFF"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </Icon>
  );
};
