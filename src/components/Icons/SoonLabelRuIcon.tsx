import { FC } from "react";

import { IIconsProps } from "config/types";
import { colors } from "config/constants";

{
  /* eslint-disable max-len */
}
const SoonLabelRuIcon: FC<IIconsProps> = ({ className }) => (
  <svg className={className} width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="46" y="5" width="5" height="5" transform="rotate(-90 46 5)" fill="#AECEFF" />
    <rect
      x="46"
      y="5"
      width="5"
      height="5"
      transform="rotate(-90 46 5)"
      fill="url(#paint0_linear_2583:12744)"
      fillOpacity="0.35"
    />
    <rect y="46" width="5" height="5" fill="#AECEFF" />
    <rect y="46" width="5" height="5" fill="url(#paint1_linear_2583:12744)" fillOpacity="0.35" />
    <path
      d="M0 51V28.9463C0 27.8855 0.421426 26.868 1.17157 26.1179L26.1179 1.17157C26.868 0.421427 27.8855 0 28.9463 0H51L0 51Z"
      fill={colors.blue2}
    />
    <path
      d="M13.6082 28.1315C13.8177 27.922 13.9304 27.6872 13.9466 27.4271C13.9627 27.167 13.8856 26.9426 13.7152 26.7539L14.5059 25.9632C14.7292 26.2049 14.8742 26.4949 14.9409 26.8333C15.0054 27.1693 14.9801 27.5123 14.865 27.8622C14.7499 28.212 14.5577 28.5216 14.2884 28.7909C13.7659 29.3134 13.1824 29.5586 12.5379 29.5264C11.8934 29.4941 11.273 29.1799 10.6769 28.5838L10.5906 28.4975C10.022 27.9289 9.71934 27.3224 9.68251 26.6779C9.64338 26.0311 9.88622 25.4453 10.411 24.9205C10.8553 24.4763 11.3467 24.2449 11.8853 24.2265C12.4239 24.2035 12.9108 24.3957 13.3458 24.8031L12.5551 25.5938C12.3319 25.3889 12.0821 25.2865 11.8059 25.2865C11.532 25.2842 11.2892 25.3889 11.0774 25.6007C10.8058 25.8723 10.6953 26.1807 10.7459 26.526C10.7943 26.869 11.0175 27.2418 11.4158 27.6447L11.5504 27.7793C11.9555 28.1844 12.3307 28.4146 12.676 28.4698C13.0212 28.5205 13.332 28.4077 13.6082 28.1315ZM16.2253 23.7604L15.8006 24.1851L17.2784 25.6628L16.4394 26.5018L12.7036 22.766L13.5426 21.927L15.0341 23.4186L15.4036 23.0492L14.9444 20.5253L15.9802 19.4894L16.4187 22.6279L19.8299 23.1113L18.7389 24.2023L16.2253 23.7604ZM18.0311 21.1053C17.6651 20.7393 17.4084 20.3377 17.2611 19.9003C17.1115 19.4607 17.0896 19.0314 17.1955 18.6125C17.2991 18.1912 17.5212 17.8103 17.8619 17.4696C18.366 16.9655 18.9368 16.7193 19.5744 16.7308C20.2143 16.74 20.8151 17.0001 21.3767 17.5111L21.577 17.7044C21.9452 18.0727 22.203 18.4732 22.3504 18.9059C22.5 19.3364 22.5218 19.7634 22.416 20.1869C22.3124 20.6081 22.088 20.9914 21.7427 21.3366C21.2156 21.8637 20.6183 22.1112 19.9508 22.079C19.2832 22.0421 18.6572 21.7314 18.0725 21.1467L18.0311 21.1053ZM18.9426 20.3388C19.327 20.7232 19.7079 20.9453 20.0854 21.0052C20.4606 21.0627 20.7897 20.9499 21.0729 20.6668C21.356 20.3837 21.4653 20.0534 21.4009 19.6759C21.3387 19.2961 21.0947 18.8933 20.6689 18.4675C20.2914 18.09 19.9105 17.8724 19.5261 17.8149C19.144 17.7551 18.8137 17.8644 18.5352 18.1429C18.2612 18.4168 18.1531 18.7437 18.2106 19.1235C18.2658 19.501 18.5098 19.9061 18.9426 20.3388ZM25.5579 13.7235C26.1356 14.3012 26.4659 14.8939 26.5488 15.5016C26.6294 16.107 26.4487 16.6306 26.0067 17.0726C25.597 17.4823 25.1344 17.6756 24.6188 17.6526L26.39 19.4238L25.551 20.2628L20.3789 15.0907L21.1523 14.3174L21.5666 14.6626C21.5137 14.1171 21.699 13.6326 22.1225 13.209C22.5782 12.7533 23.1053 12.5668 23.7038 12.6497C24.3023 12.728 24.903 13.0686 25.5061 13.6717L25.5579 13.7235ZM24.6498 14.4865C24.2769 14.1136 23.9064 13.8927 23.5381 13.8236C23.1721 13.7523 22.851 13.8547 22.5748 14.1309C22.2318 14.4739 22.1271 14.8617 22.2606 15.2945L23.9179 16.9517C24.3598 17.0898 24.7534 16.9863 25.0987 16.641C25.3657 16.374 25.467 16.0586 25.4025 15.695C25.3381 15.3267 25.0872 14.9239 24.6498 14.4865ZM26.0413 13.0951C25.6753 12.7291 25.4186 12.3275 25.2713 11.8901C25.1217 11.4505 25.0998 11.0212 25.2057 10.6023C25.3093 10.1811 25.5314 9.80011 25.8721 9.45944C26.3762 8.95535 26.947 8.70906 27.5846 8.72057C28.2245 8.72978 28.8253 8.98988 29.3869 9.50088L29.5872 9.69423C29.9554 10.0625 30.2132 10.463 30.3606 10.8958C30.5102 11.3262 30.532 11.7532 30.4262 12.1767C30.3226 12.5979 30.0981 12.9812 29.7529 13.3264C29.2258 13.8535 28.6285 14.101 27.9609 14.0688C27.2934 14.0319 26.6673 13.7212 26.0827 13.1365L26.0413 13.0951ZM26.9528 12.3286C27.3372 12.713 27.7181 12.9351 28.0956 12.995C28.4708 13.0525 28.7999 12.9397 29.0831 12.6566C29.3662 12.3735 29.4755 12.0432 29.4111 11.6657C29.3489 11.2859 29.1049 10.8831 28.6791 10.4573C28.3016 10.0798 27.9207 9.86226 27.5363 9.80471C27.1542 9.74486 26.8239 9.8542 26.5453 10.1327C26.2714 10.4066 26.1633 10.7335 26.2208 11.1133C26.276 11.4908 26.52 11.8959 26.9528 12.3286Z"
      fill="white"
    />
    <defs>
      <linearGradient id="paint0_linear_2583:12744" x1="46" y1="7" x2="51" y2="7" gradientUnits="userSpaceOnUse">
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2583:12744"
        x1="5"
        y1="49"
        x2="-2.86049e-08"
        y2="49"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default SoonLabelRuIcon;