import type { SVGProps } from "react";

export const DailyMed = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 492 265"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M132.5 0H247v265H132.5C59.322 265 0 205.678 0 132.5S59.322 0 132.5 0Z"
        fill="#FFCE70"
      />
      <path
        d="M247 265h112.5c73.178 0 132.5-59.322 132.5-132.5S432.678 0 359.5 0H247v265Z"
        fill="transparent"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M294 218h65.5c47.22 0 85.5-38.28 85.5-85.5S406.72 47 359.5 47H294v171Zm65.5 47c73.178 0 132.5-59.322 132.5-132.5S432.678 0 359.5 0H247v265h112.5Z"
        fill="#F98D1B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 154c0 16.794 3.629 32.684 10.096 46.828C60.388 185.225 47 160.426 47 132.5 47 85.28 85.28 47 132.5 47h38.86C115.933 47 71 94.906 71 154Z"
        fill="#fff"
      />
    </svg>
  );
};
