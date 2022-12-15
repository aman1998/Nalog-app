import { FC } from "react";
import cn from "classnames";

import { colors } from "config/constants";

import CheckIcon from "components/Icons/CheckIcon";

export type TFeature = {
  title: string,
  subTitle?: null|string,
  checked: boolean,
  pink?: boolean,
  fat?: boolean,
}
export type TFeatures = TFeature[][]

export type TPricingCardFeatures = {
  features: TFeatures
}

const PricingCardFeatures: FC<TPricingCardFeatures> = ({ features }) => (
  <div className="pricing__card__features">
    {
      features.map((group, index) => (
        <div key={index} className="pricing__card__features__group">
          {
            group.map((feature, groupIndex) => (
              <div
                key={groupIndex}
                className={cn("pricing__card__features__element", {
                  "not-checked": !feature.checked, pink: feature.pink, fat: feature.fat })}
              >
                <CheckIcon color={feature.checked ? colors.green3 : colors.gray5}/>
                <p>
                  <span className="pricing__card__features__title">
                    {feature.title}
                  </span>
                  {feature.subTitle && <>- <span
                    className={cn("pricing__card__features__subtitle", { "not-checked": !feature.checked })}
                  >
                    {feature.subTitle}
                  </span></>}
                </p>

              </div>
            ))
          }
        </div>
      ))
    }
  </div>
);

export default PricingCardFeatures;