import { Icon, IconProps } from "@chakra-ui/react";

export const IconRefresh = (props: IconProps) => {
  return (
    <Icon {...props} aria-label="Refresh icon">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 0C13.2188 0 13 0.25 13 0.5V4.5625C12 2.125 9.625 0.5 7 0.5C3.8125 0.5 1.09375 2.78125 0.5625 5.9375C0.53125 6.21875 0.71875 6.46875 1 6.5C1 6.5 1.03125 6.5 1.0625 6.5C1.3125 6.5 1.53125 6.34375 1.5625 6.09375C2 3.4375 4.28125 1.5 7 1.5C9.25 1.5 11.2812 2.90625 12.0938 5H8.5C8.21875 5 8 5.25 8 5.5C8 5.78125 8.21875 6 8.5 6H13.5C13.75 6 14 5.78125 14 5.5V0.5C14 0.25 13.75 0 13.5 0ZM12.9688 7.53125C12.6875 7.46875 12.4375 7.65625 12.375 7.9375C11.9688 10.5938 9.6875 12.5 6.96875 12.5C4.6875 12.5 2.65625 11.125 1.84375 9H5.5C5.75 9 6 8.78125 6 8.5C6 8.25 5.75 8 5.5 8H0.5C0.21875 8 0 8.25 0 8.5V13.5C0 13.7812 0.21875 14 0.5 14C0.75 14 1 13.7812 1 13.5V9.46875C1.96875 11.9062 4.34375 13.5 7 13.5C10.1562 13.5 12.875 11.25 13.4062 8.09375C13.4375 7.8125 13.25 7.5625 12.9688 7.53125Z"
          fill="#211F33"
        />
      </svg>
    </Icon>
  );
};
